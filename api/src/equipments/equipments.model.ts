import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Element } from 'src/elements/elements.model';
import { Floors } from 'src/floors/floors.model';
import { Project } from 'src/offices/projects.model';
import { User } from 'src/users/users.model';

interface EquipmentCreationAttrs {
  name: string;
}

@Table({ tableName: 'equipments' })
export class Equipment extends Model<Equipment, EquipmentCreationAttrs> {
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
}
