import {
  IsDefined,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  ValidateIf,
} from 'class-validator';

export class RegisterUserHttpDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.password === o.confirmPassword, {
    message: 'Passwords do not match',
  })
  confirmPassword!: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  username!: string;

  @IsDefined()
  @IsIn(['COMMON', 'ARTIST'])
  type: 'COMMON' | 'ARTIST' = 'COMMON';

  @IsString()
  @IsOptional()
  profileImage!: string;
}
