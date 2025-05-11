import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Laborcosts } from './laborcosts.model';
import { CreateLaborcostsDto } from './dto/create-laborcosts-dto';
import { UpdateLaborcostsDto } from './dto/update-laborcosts-dto';
import { Project } from 'src/offices/projects.model';
import { Task } from 'src/equipments/tasks.model';

@Injectable()
export class LaborcostsService {
  constructor(
    @InjectModel(Laborcosts) private laborcostsRepository: typeof Laborcosts,
  ) {}

  async create(dto: CreateLaborcostsDto) {
    console.log('dto', dto);
    try {
      const task = await Task.findByPk(dto.taskId);
      if (!task) {
        throw new Error('Офис не найден');
      }
      return await this.laborcostsRepository.create(dto);
    } catch (error) {
      console.error('Ошибка при создании этажа:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAll() {
    try {
      const laborcosts = await this.laborcostsRepository.findAll({
        include: { all: true },
      });
      return laborcosts;
    } catch (error) {
      console.error('Ошибка при получении списка этажей:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getOne(id: string) {
    try {
      const laborcost = await this.laborcostsRepository.findOne({
        where: { id },
      });
      return laborcost;
    } catch (error) {
      console.error('Ошибка при получении этажа:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(dto: UpdateLaborcostsDto, id: string) {
    try {
      const laborcost = await this.laborcostsRepository.findOne({
        where: { id },
      });
      if (!laborcost) {
        throw new Error('Этаж не найден');
      }
      Object.assign(laborcost, dto);
      await laborcost.save();
      return laborcost;
    } catch (error) {
      console.error('Ошибка при обновлении этажа:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string) {
    try {
      const laborcost = await this.laborcostsRepository.findOne({
        where: { id },
      });
      if (!laborcost) {
        throw new Error('Этаж не найден');
      }
      await laborcost.destroy();
      return laborcost;
    } catch (error) {
      console.error('Ошибка при удалении этажа:', error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
