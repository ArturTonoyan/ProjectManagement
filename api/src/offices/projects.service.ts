import { InjectModel } from '@nestjs/sequelize';
import { Project } from './projects.model';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatProjectsDto } from './dto/create-projects-dto';
import { UpdateProjectsDto } from './dto/update-projects-dto';
import { Sequelize } from 'sequelize-typescript';
import { ProjectsUsers } from './projects-users.model';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project)
    private readonly projectRepository: typeof Project,

    @InjectModel(ProjectsUsers)
    private readonly projectsUsersRepository: typeof ProjectsUsers,

    private readonly sequelize: Sequelize, // <-- добавьте это
  ) {}

  async create(dto: CreatProjectsDto) {
    const t = await this.sequelize.transaction();

    try {
      // 1. Создаем проект
      const project = await this.projectRepository.create(dto, {
        transaction: t,
      });

      // 2. Создаем связь в projects_users с ролью DIRECTOR
      await this.projectsUsersRepository.create(
        {
          projectId: project.id,
          userId: dto.directorId,
          role: 'DIRECTOR',
        },
        { transaction: t },
      );

      await t.commit();
      return project;
    } catch (error) {
      await t.rollback();
      console.error('Ошибка при создании проекта:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getById(id: string) {
    try {
      const project = await this.projectRepository.findOne({ where: { id } });
      return project;
    } catch (error) {
      console.error('Ошибка при получении офиса:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAll() {
    try {
      const projects = await this.projectRepository.findAll({
        include: { all: true },
      });
      return projects;
    } catch (error) {
      console.error('Ошибка при получении списка офисов:', error);
      throw new InternalServerErrorException(error.message);
    }
  }
  async update(id: string, dto: UpdateProjectsDto) {
    const transaction = await this.sequelize.transaction();

    try {
      const project = await this.projectRepository.findByPk(id, {
        transaction,
      });
      if (!project) {
        throw new NotFoundException('Проект не найден');
      }

      // Сохраняем старого директора (если нужно сравнивать)
      const oldDirectorId = project.directorId;

      // Обновляем проект
      await project.update(dto, { transaction });

      // Если директор передан и отличается от текущего — обновим связь
      if (dto.directorId && dto.directorId !== oldDirectorId) {
        // Ищем текущую запись о директоре
        const directorRelation = await this.projectsUsersRepository.findOne({
          where: {
            projectId: id,
            role: 'DIRECTOR',
          },
          transaction,
        });

        if (directorRelation) {
          // Обновляем userId на нового директора
          directorRelation.userId = dto.directorId;
          await directorRelation.save({ transaction });
        } else {
          // Если такой связи нет, создаем новую
          await this.projectsUsersRepository.create(
            {
              projectId: id,
              userId: dto.directorId,
              role: 'DIRECTOR',
            },
            { transaction },
          );
        }
      }

      await transaction.commit();
      return project;
    } catch (error) {
      await transaction.rollback();
      console.error('Ошибка при обновлении проекта:', error);
      throw new InternalServerErrorException('Не удалось обновить проект');
    }
  }

  async delete(id: string) {
    try {
      const project = await this.projectRepository.findOne({ where: { id } });
      if (!project) {
        throw new Error('Офис не найден');
      }
      await project.destroy();
      return project;
    } catch (error) {
      console.error('Ошибка при удалении офиса:', error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
