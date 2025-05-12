import { IsString } from 'class-validator';

export class UpdateProjectsDto {
  @IsString({ message: 'Должно быть строкой' }) //! валидация
  readonly name: string;
  directorId?: string;
  description?: string;
  users?: any[];
}
