/* eslint-disable prettier/prettier */
import { TeamModel } from './../model/team.model';
import { TeamResolver } from './../resolver/team.resolver';
import { TeamService } from './../service/team.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './player.module';

@Module({
    imports: [TypeOrmModule.forFeature([TeamModel]), PlayerModule],
    providers: [TeamService, TeamResolver],
    exports: [TeamService]
  })

export class TeamModule{}