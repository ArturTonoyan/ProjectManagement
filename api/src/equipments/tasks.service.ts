import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-task-dto';
import { Task } from './tasks.model';
import { ProjectsUsers } from 'src/offices/projects-users.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    @InjectModel(ProjectsUsers)
    private projectsUsersRepository: typeof ProjectsUsers,
    private readonly sequelize: Sequelize, // <-- добавьте это
  ) {}

  async create(dto: CreateTaskDto) {
    const transaction = await this.sequelize.transaction();

    try {
      // 1. Создаём задачу
      const task = await this.taskRepository.create(dto, { transaction });

      // 2. Проверяем, нужно ли добавить пользователя в проект
      if (dto.userId && dto.projectId) {
        const existingRelation = await this.projectsUsersRepository.findOne({
          where: {
            projectId: dto.projectId,
            userId: dto.userId,
          },
          transaction,
        });

        if (!existingRelation) {
          await this.projectsUsersRepository.create(
            {
              projectId: dto.projectId,
              userId: dto.userId,
              role: '', // можно изменить при необходимости
            },
            { transaction },
          );
        }
      }

      await transaction.commit();
      return task;
    } catch (error) {
      await transaction.rollback();
      console.error('Ошибка при создании задачи:', error);
      throw new InternalServerErrorException('Не удалось создать задачу');
    }
  }

  async update(id: string, dto: CreateTaskDto) {
    const transaction = await this.sequelize.transaction();

    try {
      const task = await this.taskRepository.findByPk(id, { transaction });
      if (!task) {
        throw new NotFoundException('Задача не найдена');
      }

      if (dto.userId) {
        const existingRelation = await this.projectsUsersRepository.findOne({
          where: {
            projectId: dto.projectId,
            userId: dto.userId,
          },
          transaction,
        });

        if (!existingRelation) {
          await this.projectsUsersRepository.create(
            {
              projectId: dto.projectId,
              userId: dto.userId,
              role: '', // Можно заменить на "Исполнитель" или другую роль
            },
            { transaction },
          );
        }
      }

      await task.update(dto, { transaction });

      await transaction.commit();
      return task;
    } catch (error) {
      await transaction.rollback();
      console.error('Ошибка при обновлении задачи:', error);
      throw new InternalServerErrorException('Не удалось обновить задачу');
    }
  }

  async delete(id: string) {
    const task = await Task.findByPk(id);
    if (!task) {
      throw new Error('Задача не найдена');
    }
    await task.destroy();
    return task;
  }

  async getAll() {
    const tasks = await this.taskRepository.findAll({
      include: { all: true },
    });
    return tasks;
  }
}
