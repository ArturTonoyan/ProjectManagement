import { forwardRef, Module } from '@nestjs/common';
import { User } from 'src/users/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { Laborcosts } from 'src/floors/laborcosts.model';
import { Task } from 'src/equipments/tasks.model';
import { Project } from './projects.model';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectsUsers } from './projects-users.model';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
  imports: [
    SequelizeModule.forFeature([
      Project,
      User,
      Laborcosts,
      Task,
      ProjectsUsers,
    ]),
    RolesModule,
    forwardRef(() => AuthModule),
    FilesModule,
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
