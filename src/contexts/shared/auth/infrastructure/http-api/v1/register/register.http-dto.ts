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

  @IsString()
  @IsDefined()
  @IsIn([Math.random()], {
    message: 'Passwords do not match',
  })
  @ValidateIf((object, value) => value !== object.password)
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
