import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Laborcosts } from 'src/floors/laborcosts.model';
import { Project } from 'src/offices/projects.model';
import { User } from 'src/users/users.model';

interface TaskCreationAttrs {
  name: string;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreationAttrs> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  status: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  authorId: string;

  @BelongsTo(() => User)
  author: User; // 👈 добавлено

  @ForeignKey(() => Project)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  projectId: string;

  @BelongsTo(() => Project)
  project: Project; // 👈 добавлено

  @Column({
    type: DataType.INTEGER,
  })
  maxTimeCost: number;

  @Column({
    type: DataType.INTEGER,
  })
  currentTimeCost: number;

  @Column({
    type: DataType.INTEGER,
  })
  state: number;

  @HasMany(() => Laborcosts)
  laborcosts: Laborcosts[];
}
