import { Injectable } from '@nestjs/common';
import { Equipment } from './equipments.model';
import { RolesService } from 'src/roles/roles.service';
import { FilesService } from 'src/files/files.service';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEquipmentDto } from './dto/create-equipment-dto';

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectModel(Equipment) private equipmentRepository: typeof Equipment,
  ) {}

  async create(dto: CreateEquipmentDto) {
    const equipment = await this.equipmentRepository.create(dto);
    return equipment;
  }

  async update(id: string, dto: CreateEquipmentDto) {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) {
      throw new Error('Задача не найдена');
    }
    Object.assign(equipment, dto);
    await equipment.save();
    return equipment;
  }

  async delete(id: string) {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) {
      throw new Error('Задача не найдена');
    }
    await equipment.destroy();
    return equipment;
  }

  async getAll() {
    const equipments = await this.equipmentRepository.findAll({
      include: { all: true },
    });
    return equipments;
  }
}
