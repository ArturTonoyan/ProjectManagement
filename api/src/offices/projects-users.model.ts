import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Project } from './projects.model';

@Table({ tableName: 'projects_users', createdAt: false, updatedAt: false })
export class ProjectsUsers extends Model<ProjectsUsers> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.UUID,
  })
  projectId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @Column({
    type: DataType.STRING,
  })
  role: string;
}
