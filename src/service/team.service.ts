/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { TeamModel } from './../model/team.model'
import { TeamValidation } from './../validation/team.validation'
import { PlayerService } from './player.service'

@Injectable()
export class TeamService{
    constructor(
        @InjectRepository(TeamModel)
        private teamRepository: Repository<TeamModel>,
        private playerService: PlayerService
    ){}

    create(details: TeamValidation): Promise<TeamModel>{
        return this.teamRepository.save(details)
    }

    update(details: TeamValidation): Promise<UpdateResult>{
        return this.teamRepository.update(details.id,details)
    }

    delete(id: string): Promise<DeleteResult>{
        return this.teamRepository.delete(id)
    }

    read(id: string): Promise<TeamModel>{
        return this.teamRepository.findOne(id)
    }

    findAll(): Promise<TeamModel[]>{
        return this.teamRepository.find()
    }
}