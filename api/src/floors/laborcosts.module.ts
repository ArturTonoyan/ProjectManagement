import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/users.model';
import { Task } from 'src/equipments/tasks.model';
import { Project } from 'src/offices/projects.model';
import { Laborcosts } from './laborcosts.model';
import { LaborcostsController } from './laborcosts.controller';
import { LaborcostsService } from './laborcosts.service';

@Module({
  providers: [LaborcostsService],
  controllers: [LaborcostsController],
  imports: [
    SequelizeModule.forFeature([Laborcosts, User, Project, Task]),
    RolesModule,
    forwardRef(() => AuthModule),
    FilesModule,
  ],
  exports: [LaborcostsService],
})
export class LaborcostsModule {}
