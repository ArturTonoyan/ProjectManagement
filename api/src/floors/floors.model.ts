import { Model, Column, DataType, Table, HasMany } from 'sequelize-typescript';
import { Element } from 'src/elements/elements.model';
import { Equipment } from 'src/equipments/equipments.model';
import { User } from 'src/users/users.model';

interface FloorsCreationAttrs {
  //! для создание модели необходимы только эти поля
  name: string;
}

@Table({ tableName: 'floors' })
export class Floors extends Model<Floors, FloorsCreationAttrs> {
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  number: number;

  @HasMany(() => Element)
  elements: Element[];
}
