import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Должно быть строкой' }) //! валидация
  readonly name?: string;
  authorId?: string;
  projectId?: string;
  userId?: string;
}
