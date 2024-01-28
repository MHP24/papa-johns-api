import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString({
    message:
      'La contraseña debe contener al menos una letra,' +
      ' un número y un símbolo, y tener una longitud mínima de 8 caracteres.',
  })
  password: string;
}
