import { IsString, IsEmail, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLeadDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNumber()
    phone: number;

    @IsString()
    status: string;

    @IsString()
    sex: string;
    
    @IsNumber()
    age: number;

    @IsString()
    localisation: string;

    @IsString()
    ville: string;

    @IsString()
    situation: string;


    
}
