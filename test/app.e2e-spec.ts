/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { TeamModel } from './../src/model/team.model'
import { PlayerModel } from './../src/model/player.model'
import { randomInt } from 'crypto'

const createGraphQlParam = (obj: object) => { 
  return JSON.stringify(obj).replace(
    /\"([^(\")"]+)\":/g,
  '$1:',
)
}

const player1: PlayerModel = {
  id: "1",
  first_name: `lala5`,
  last_name: `trala`,
  current_number: `93`,
  current_team: `14`,
  position: `goal keeper`,
  age: `18`,
  photo: `http://google.com`
}

const team: TeamModel = 
{
  id: "14",
  name: `test51`,
  code: "PL",
  country: "Poland",
  national: false
}

const queries = {
    allTeams: `
      query AllTeams{
        teams{
          id,
          name,
          code,
          country,
          national,
          player{first_name, last_name}
        }
      }`,
    allPlayers: `
      query AllPlayers{
        allPlayers{
          first_name
        }
      }`,
    allPlayersInTeam: `
      query playersInTeam(
        $current_team: String!
      ){
        inTeamPlayers(current_team: $current_team){
          current_team
        }
      }
    `,
    addTeam: `
      mutation TeamModel($name: String!, $code: String!, $country: String!, $national: Boolean!){
        addTeam(
          name: $name,
          code: $code,
          country: $country,
          national: $national){
            id,
            name,
            code,
            national
          }
        }
      `,
    addPlayer: `
      mutation AddPlayer($first_name:String!, $last_name:String!, $current_number: String!, $current_team:String!, $position: String!, $age: String!, $photo: String!){
        addPlayer(
          first_name: $first_name,
          last_name: $last_name,
          current_number: $current_number,
          current_team: $current_team,
          position: $position,
          age: $age,
          photo: $photo
        ){
          id,
          first_name,
          current_number,
          current_team
        }
      }`,
    getTeam: `
      query Team($id: String!){
        team(id: $id){
          id,
          name,
          code,
          country,
          national
        }
      }
    `,
    getPlayer: `
      query Player($id: String!){
        player(id: $id){
          first_name,
          current_number,
          age
        }
      }
    `,
    updateTeam: `
      mutation TeamModelUpdate($id:String!, $name: String!, $code: String!, $country: String!, $national: Boolean!){
        updateTeam(
          id: $id,
          name: $name,
          code: $code,
          country: $country,
          national: $national){
            __typename
          }
        }`,
    updatePlayer: `
      mutation UpdatePlayer($id: String!, $first_name:String!, $last_name:String!, $current_number: String!, $current_team:String!, $position: String!, $age: String!, $photo: String!){
        updatePlayer(
          id: $id,
          first_name: $first_name,
          last_name: $last_name,
          current_number: $current_number,
          current_team: $current_team,
          position: $position,
          age: $age,
          photo: $photo
        ){
        __typename
      }
    }`,
    deleteTeam: `
      query DeleteTeam($id: String!){
        deleteTeam(id: $id){
          __typename
        }
      }`,
    deletePlayer: `
      query DeletePlayer($id: String!){
        deletePlayer(id: $id){
          __typename
        }
      }`
}

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('addTeam', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: queries.addTeam,
        variables: team
      })
      .expect(({ body }) => {
        const result = body.data.addTeam 

        expect(result.name).toBe(team.name)
        expect(result.code).toBe(team.code)
        expect(result.national).toBe(team.national)

        player1.current_team = result.id
        team.id = result.id
        team.player = [player1]
      })
      .expect(200);
  })

  it('addPlayer', () => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      operationName: null,
      query: queries.addPlayer,
      variables: player1
    })
    .expect(({ body }) => {
      const result = body.data.addPlayer

      expect(result.first_name).toBe(player1.first_name)
      expect(result.current_number).toBe(player1.current_number)
      expect(result.current_team).toBe(player1.current_team)
      team.player[0].id = result.id
    })
    .expect(200);
  })
  
  it('allTeams', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: queries.allTeams,
      })
      .expect(({ body }) => {
        const data = body.data.teams
        const result = data[0]

        expect(result.name).toBe(team.name)
        expect(result.code).toBe(team.code)
        expect(result.national).toBe(team.national)
        expect(result.player[0].first_name).toBe(team.player[0].first_name)
      })
      .expect(200);
  })

  it('allPlayers', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: queries.allPlayers,
      })
      .expect(({ body }) => {
        const data = body.data.allPlayers
        const result = data[0]

        expect(result.first_name).toBe(player1.first_name)
      })
      .expect(200);
  })

  it('allPlayersInTeam', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: queries.allPlayersInTeam,
        variables: {
          current_team: team.id
        }
      })
      .expect(({ body }) => {
        const data = body.data.inTeamPlayers
        const result = data[0]

        expect(result.current_team).toBe(player1.current_team)
      })
      .expect(200);
  })

  it('getTeam', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: queries.getTeam,
        variables:{ 
          id: team.id
        }
      })
      .expect(({ body }) => {
        const data = body.data.team
        const result = data

        expect(result.name).toBe(team.name)
        expect(result.code).toBe(team.code)
        expect(result.national).toBe(team.national)
      })
      .expect(200);
  })

  it('getPlayer', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: queries.getPlayer,
        variables: {
          id: player1.id
        }
      })
      .expect(({ body }) => {
        const data = body.data.player
        const result = data

        expect(result.first_name).toBe(player1.first_name)
        expect(result.current_number).toBe(player1.current_number)
        expect(result.age).toBe(player1.age)
      })
      .expect(200);
    })

    it('updateTeam', () => {
      team.name = `${team.name} + 12`

      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          query: queries.updateTeam,
          variables: team
        })
        .expect(({ body }) => {
          const data = body.data.updateTeam
          const result = data

          expect(result.__typename).toBe("TeamModel")
        })
        .expect(200);
    })

    it('updatePlayer', () => {
      player1.first_name = `${player1.first_name} + 19`

        return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          query: queries.updatePlayer,
          variables: player1
        })
        .expect(({ body }) => {
          const data = body.data.updatePlayer
          const result = data

          expect(result.__typename).toBe("PlayerModel")
        })
        .expect(200);
    })

    it('deletePlayer', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          query: queries.deletePlayer,
          variables: player1
        })
        .expect(({ body }) => {
          const data = body.data.deletePlayer
          const result = data

          expect(result.__typename).toBe("PlayerModel")
        })
        .expect(200);
    })

    it('deleteTeam', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          query: queries.deleteTeam,
          variables: team
        })
        .expect(({ body }) => {
          const data = body.data.deleteTeam
          const result = data

          expect(result.__typename).toBe("TeamModel")
        })
        .expect(200);
    })
})
