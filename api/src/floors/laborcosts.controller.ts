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
import { CreateLaborcostsDto } from './dto/create-laborcosts-dto';
import { UpdateLaborcostsDto } from './dto/update-laborcosts-dto';
import { LaborcostsService } from './laborcosts.service';

@Controller('laborcosts')
export class LaborcostsController {
  constructor(private laborcostsService: LaborcostsService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() dto: CreateLaborcostsDto) {
    return this.laborcostsService.create(dto);
  }

  @Get()
  getAll() {
    return this.laborcostsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.laborcostsService.getOne(id);
  }

  @Roles('ADMIN')
  @Put(':id')
  update(@Body() dto: UpdateLaborcostsDto, @Param('id') id: string) {
    return this.laborcostsService.update(dto, id);
  }

  @Roles('ADMIN')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.laborcostsService.delete(id);
  }
}
