/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TeamModel } from './../model/team.model';
import { TeamService } from './../service/team.service';
import { Resolver, Args, Query, Mutation, ResolveField, Parent} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PlayerService } from './../service/player.service';

@Resolver(of => TeamModel)
export class TeamResolver{
    constructor(
        @Inject(TeamService) private teamService: TeamService,
        @Inject(PlayerService) private playerService: PlayerService
    ){}

    @Query(returns => TeamModel)
    async team(@Args('id') id: string): Promise<TeamModel>{
        return await this.teamService.read(id)
    }

    @Query(returns => [TeamModel])
    async teams(): Promise<TeamModel[]>{
        return await this.teamService.findAll()
    }

    @Mutation(returns => TeamModel)
    async addTeam(
        @Args('name') name: string,
        @Args('code') code: string,
        @Args('country') country: string,
        @Args('national') national: boolean
    ): Promise<TeamModel>{
        return await this.teamService.create({name, code, country, national})
    }

    @Mutation(returns => TeamModel)
    async updateTeam(
        @Args('id') id: string,
        @Args('name') name: string,
        @Args('code') code: string,
        @Args('country') country: string,
        @Args('national') national: boolean
    ): Promise<UpdateResult>{
        return await this.teamService.update({id, name, code, country, national})
    }

    @Query(returns => TeamModel)
    async deleteTeam(@Args('id') id: string): Promise<DeleteResult>{
        return await this.teamService.delete(id)
    }

    @ResolveField()
    async player(@Parent() team: TeamModel) {
        const { id } = team;
        return this.playerService.findAllInTeam(id);
    }
}