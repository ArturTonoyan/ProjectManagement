import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { FloorsModule } from './floors/floors.module';
import { Floors } from './floors/floors.model';
import { EquipmentsModule } from './equipments/equipments.module';
import { Equipment } from './equipments/equipments.model';
import { ElementsModule } from './elements/elements.module';
import { Element } from './elements/elements.model';
import { Project } from './offices/projects.model';
import { ProjectsModule } from './offices/projects.module';
import { ProjectsUsers } from './offices/projects-users.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'uploads'), // Путь к папке uploads
      serveRoot: '/', // URL путь для доступа к файлам
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Role,
        UserRoles,
        Project,
        Floors,
        Equipment,
        Element,
        ProjectsUsers,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
    ProjectsModule,
    FloorsModule,
    EquipmentsModule,
    ElementsModule,
  ],
})
export class AppModule {}
