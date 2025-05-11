import { IsString } from 'class-validator';

export class CreateEquipmentDto {
  @IsString({ message: 'Должно быть строкой' }) //! валидация
  readonly name?: string;
  authorId?: string;
  projectId?: string;
}
