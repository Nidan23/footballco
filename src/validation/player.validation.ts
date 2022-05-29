/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator"
export class PlayerValidation{
    id?: string
    @IsNotEmpty()
    first_name: string
    @IsNotEmpty()
    last_name: string
    @IsNotEmpty()
    current_number: string
    @IsNotEmpty()
    current_team: string
    @IsNotEmpty()
    position: string
    @IsNotEmpty()
    age: string
    @IsNotEmpty()
    photo: string
}