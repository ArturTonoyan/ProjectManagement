import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Roles } from 'src/auth/roles-auth-decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatProjectsDto } from './dto/create-projects-dto';
import { UpdateProjectsDto } from './dto/update-projects-dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post('/create')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() dto: CreatProjectsDto) {
    return this.projectsService.create(dto);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.projectsService.getAll();
  }

  @Get('one/:id')
  @UseGuards(JwtAuthGuard)
  getById(@Param('id') id: string) {
    return this.projectsService.getById(id);
  }

  @Roles('ADMIN')
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Body() dto: UpdateProjectsDto, @Param('id') id: string) {
    return this.projectsService.update(id, dto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }
}
