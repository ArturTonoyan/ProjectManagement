import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth-decorator';
import { FloorsService } from './floors.service';
import { CreateFloorsDto } from './dto/create-floors-dto';
import { UpdateFloorsDto } from './dto/update-floors-dto';

@Controller('floors')
export class FloorsController {
  constructor(private floorsService: FloorsService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() dto: CreateFloorsDto) {
    return this.floorsService.create(dto);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.floorsService.getOne(id);
  }

  @Roles('ADMIN')
  @Put(':id')
  update(@Body() dto: UpdateFloorsDto, @Param('id') id: string) {
    return this.floorsService.update(dto, id);
  }

  @Roles('ADMIN')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.floorsService.delete(id);
  }
}
