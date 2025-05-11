import { Injectable, NotFoundException } from '@nestjs/common';
import { RolesService } from 'src/roles/roles.service';
import { FilesService } from 'src/files/files.service';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-task-dto';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

  async create(dto: CreateTaskDto) {
    const task = await this.taskRepository.create(dto);
    return task;
  }

  async update(id: string, dto: CreateTaskDto) {
    console.log('dto', dto);
    const task = await this.taskRepository.findByPk(id);
    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }

    await task.update(dto);
    return task;
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
