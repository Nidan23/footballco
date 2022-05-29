/* eslint-disable prettier/prettier */
import { PlayerModel } from './../model/player.model';
import { PlayerResolver } from './../resolver/player.resolver';
import { PlayerService } from './../service/player.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([PlayerModel])],
    providers: [PlayerService, PlayerResolver],
    exports: [PlayerService]
  })

export class PlayerModule{}