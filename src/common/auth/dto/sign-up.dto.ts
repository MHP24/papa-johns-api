import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString({
    message:
      'La contraseña debe contener al menos una letra,' +
      ' un número y un símbolo, y tener una longitud mínima de 8 caracteres.',
  })
  password: string;
}
