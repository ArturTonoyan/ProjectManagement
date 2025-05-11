import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { Task } from 'src/equipments/tasks.model';
import { Laborcosts } from 'src/floors/laborcosts.model';
import { Project } from 'src/offices/projects.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      UserRoles,
      Project,
      Task,
      Laborcosts,
    ]),
    RolesModule,
    forwardRef(() => AuthModule),
    FilesModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
