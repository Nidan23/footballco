/* eslint-disable prettier/prettier */
import { PlayerModule } from './module/player.module';
import { TeamModule } from './module/team.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'football',
      password: 'team',
      database: 'footballteam',
      entities: [`${__dirname}/model/*.model.js`, `${__dirname}/model/*.model.ts`],
      synchronize: false,
      keepConnectionAlive: true
    }),
    TeamModule, PlayerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
