import { IsEmail, IsEmpty, IsString } from "class-validator"

export class AuthDTO{
    @IsEmail()
 
    email:  string
    
    @IsString()
    password: string

    passwordConfirm: string;
    username: string
    photo: string
}