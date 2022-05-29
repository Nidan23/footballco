/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { PlayerValidation } from './player.validation';

export class TeamValidation{
    id?: string
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    code: string
    @IsNotEmpty()
    country: string
    @IsNotEmpty()
    national: boolean
    player?: PlayerValidation[]
}