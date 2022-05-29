/* eslint-disable prettier/prettier */
import { TeamService } from './service/team.service';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly teamService: TeamService) {}

  @Get("/hello/there")
  getHello(): string {
    return this.appService.getHello();
  }
}

