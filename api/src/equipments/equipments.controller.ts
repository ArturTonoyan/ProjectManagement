import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { CreateEquipmentDto } from './dto/create-equipment-dto';

@Controller('equipments')
export class EquipmentsController {
  constructor(private equipmentsService: EquipmentsService) {}
  @Post()
  create(@Body() dto: CreateEquipmentDto) {
    return this.equipmentsService.create(dto);
  }

  @Get()
  getAll() {
    return this.equipmentsService.getAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CreateEquipmentDto) {
    return this.equipmentsService.update(id, dto); // Обновление пользователя
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.equipmentsService.delete(id);
  }
}
