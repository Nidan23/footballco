/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Args, Query, Mutation} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PlayerService } from './../service/player.service';
import { PlayerModel } from './../model/player.model';

@Resolver(of => PlayerModel)
export class PlayerResolver{
    constructor(
        @Inject(PlayerService) private playerService: PlayerService
    ){}

    @Query(returns => PlayerModel)
    async player(@Args('id') id: string): Promise<PlayerModel>{
        return await this.playerService.read(id)
    }

    @Query(returns => [PlayerModel])
    async inTeamPlayers(@Args('current_team') current_team: string): Promise<PlayerModel[]>{
        return await this.playerService.findAllInTeam(current_team)
    }

    @Query(returns => [PlayerModel])
    async allPlayers(): Promise<PlayerModel[]>{
        return await this.playerService.findAll()
    }

    @Mutation(returns => PlayerModel)
    async addPlayer(
        @Args('first_name') first_name: string,
        @Args('last_name') last_name: string,
        @Args('current_number') current_number: string,
        @Args('current_team') current_team: string,
        @Args('position') position: string,
        @Args('age') age: string,
        @Args('photo') photo: string
    ): Promise<PlayerModel>{
        return await this.playerService.create({first_name, last_name, current_number, current_team, position, age, photo})
    }

    @Mutation(returns => PlayerModel)
    async updatePlayer(
        @Args('id') id: string,
        @Args('first_name') first_name: string,
        @Args('last_name') last_name: string,
        @Args('current_number') current_number: string,
        @Args('current_team') current_team: string,
        @Args('position') position: string,
        @Args('age') age: string,
        @Args('photo') photo: string
    ): Promise<UpdateResult>{
        return await this.playerService.update({id, first_name, last_name, current_number, current_team, position, age, photo})
    }

    @Query(returns => PlayerModel)
    async deletePlayer(@Args('id') id: string): Promise<DeleteResult>{
        return await this.playerService.delete(id)
    }
}