/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { PlayerModel } from './../model/player.model'
import { PlayerValidation } from './../validation/player.validation'

@Injectable()
export class PlayerService{
    constructor(
        @InjectRepository(PlayerModel)
        private playerRepository: Repository<PlayerModel>
    ){}

    create(details: PlayerValidation): Promise<PlayerModel>{
        return this.playerRepository.save(details)
    }

    update(details: PlayerValidation): Promise<UpdateResult>{
        return this.playerRepository.update(details.id,details)
    }

    delete(id: string): Promise<DeleteResult>{
        return this.playerRepository.delete(id)
    }

    read(id: string): Promise<PlayerModel>{
        return this.playerRepository.findOne(id)
    }

    findAllInTeam(current_team: string): Promise<PlayerModel[]>{
        return this.playerRepository.find({
            current_team: current_team
            })
    }

    findAll(): Promise<PlayerModel[]>{
        return this.playerRepository.find()
    }
}