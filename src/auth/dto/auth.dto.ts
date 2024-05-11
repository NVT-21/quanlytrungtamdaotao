import { IsEmail, IsEmpty, IsString } from "class-validator"

export class AuthDTO{
    
 
    username:  string
    

    password: string

    passwordConfirm: string;
    
   
}