import { forwardRef, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Laborcosts } from 'src/floors/laborcosts.model';
import { User } from 'src/users/users.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { Project } from 'src/offices/projects.model';
import { Task } from './tasks.model';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    SequelizeModule.forFeature([Laborcosts, User, Task, Project]),
    RolesModule,
    forwardRef(() => AuthModule),
    FilesModule,
  ],
  exports: [TasksService],
})
export class TasksModule {}
