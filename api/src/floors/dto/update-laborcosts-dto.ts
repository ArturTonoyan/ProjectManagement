import { IsString } from 'class-validator';

export class UpdateLaborcostsDto {
  @IsString({ message: 'Должно быть строкой' }) //! валидация
  readonly name: string;
}
