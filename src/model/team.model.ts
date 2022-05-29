/* eslint-disable prettier/prettier */
import { PlayerModel } from './../model/player.model';
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class TeamModel{
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string 

    @Field()
    @Column({length: 200})
    name: string

    @Field()
    @Column({length: 3})
    code: string

    @Field()
    @Column({length: 200})
    country: string

    @Field()
    @Column()
    national: boolean

    @Field(() => [PlayerModel], {nullable: 'items'})
    player?: PlayerModel[]
}