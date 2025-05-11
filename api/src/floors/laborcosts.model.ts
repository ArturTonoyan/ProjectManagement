import {
  Model,
  Column,
  DataType,
  Table,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Task } from 'src/equipments/tasks.model';
import { User } from 'src/users/users.model';

interface LaborcostsCreationAttrs {
  //! для создание модели необходимы только эти поля
  name: string;
}

@Table({ tableName: 'laborcosts' })
export class Laborcosts extends Model<Laborcosts, LaborcostsCreationAttrs> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  activity: string;

  @Column({
    type: DataType.INTEGER,
  })
  costs: number;

  @Column({
    type: DataType.STRING,
  })
  comments: string;

  @ForeignKey(() => Task)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  taskId: string;

  @BelongsTo(() => Task)
  task: Task;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
