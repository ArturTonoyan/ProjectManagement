import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Equipment } from 'src/equipments/equipments.model';
import { User } from 'src/users/users.model';
import { ProjectsUsers } from './projects-users.model';

interface ProjectCreationAttrs {
  name: string;
  companyId: string;
}

@Table({ tableName: 'projects' })
export class Project extends Model<Project, ProjectCreationAttrs> {
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
  description: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  directorId: string;

  @Column({
    type: DataType.STRING,
  })
  dateStart: string;

  @Column({
    type: DataType.STRING,
  })
  dateEnd: string;

  @BelongsToMany(() => User, () => ProjectsUsers)
  users: User[];

  @HasMany(() => Equipment)
  eqipments: Equipment[];
}
