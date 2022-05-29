/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class PlayerModel{
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @Column({length: 200})
    first_name: string

    @Field()
    @Column({length: 200})
    last_name: string

    @Field()
    @Column()
    current_number: string

    @Field()
    @Column()
    current_team: string

    @Field()
    @Column({length: 200})
    position: string

    @Field()
    @Column()
    age: string

    @Field()
    @Column({length: 200})
    photo: string
}