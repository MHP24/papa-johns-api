import { IsEmail, IsString, Matches } from 'class-validator';

export class SignUpDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'La contraseña debe contener al menos una letra,' +
        ' un número y un símbolo, y tener una longitud mínima de 8 caracteres.',
    },
  )
  password: string;
}
