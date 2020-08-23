import { IsString, IsOptional, IsNotEmpty, IsEmail, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
    @IsOptional()
    @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
    @MaxLength(20)
    readonly fullname: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(16)
    readonly password: string;
}
