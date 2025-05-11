import { IsString } from 'class-validator';

export class CreateLaborcostsDto {
  @IsString({ message: 'Должно быть строкой' }) //! валидация
  readonly name: string;
  taskId?: string;
}
