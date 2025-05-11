import { IsEmail, IsString } from 'class-validator';

export class CreatProjectsDto {
  @IsString({ message: 'Должно быть строкой' }) //! валидация
  readonly name: string;
  directorId?: string;
}
