/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('createCircle')
  async createCircle(
    @Body('name') name: string,
    @Body('_id') _id: string,
    @Body('adminAddress') adminAddress: string,
    @Body('organizationName') organizationName: string,
    @Body('erc20Address') erc20Address: string,
    @Body('erc721Address') erc721Address: string,
    @Body('erc20Amount') erc20Amount: number,
    @Body('incentive') incentive: number,
    @Body('contributors') contributors: [string],
    @Body('epochFrom') epochFrom: Date,
    @Body('epochTo') epochTo: Date,
  ): Promise<any> {
    try {
      const res = await this.appService.createCircle({
        _id,
        name,
        adminAddress,
        organizationName,
        erc20Address,
        erc721Address,
        erc20Amount,
        incentive,
        contributors,
        epochFrom,
        epochTo,
      });
      return {
        statusCode: 200,
        data: [res],
      };
      // return true
    } catch (e) {
      console.log('error ===>', e);
      throw e;
    }
  }

  @Post('deleteCircle')
  async deleteCircle(@Body('circleID') circleID: string): Promise<any> {
    try {
      const res = await this.appService.deleteCircle(circleID);
      return {
        statusCode: 200,
        data: [res],
      };
      // return true
    } catch (e) {
      console.log('error ===>', e);
      throw e;
    }
  }

  @Post('addContributors')
  async addContributors(
    @Body('circleID') circleID: string,
    @Body('contributors') contributors: [string],
  ): Promise<any> {
    try {
      const res = await this.appService.addContributer({
        id: circleID,
        contributors,
      });
      return {
        statusCode: 200,
        data: [res],
      };
      // return true
    } catch (e) {
      console.log('error ===>', e);
      throw e;
    }
  }

  @Get('getAllCircles')
  async getAllCircles(): Promise<any> {
    try {
      const res = await this.appService.getAllCircles();
      return {
        statusCode: 200,
        data: [res],
      };
    } catch (e) {
      console.log('error ===>', e);
      throw e;
    }
  }

  @Get('circle/:id')
  async getCircleById(@Param() params): Promise<any> {
    try {
      const res = await this.appService.getCircleById(params.id);
      return {
        statusCode: 200,
        data: [res],
      };
    } catch (e) {
      console.log('error ===>', e);
      throw e;
    }
  }

  @Get('user/:address')
  async getUserCircles(@Param() params): Promise<any> {
    try {
      console.log('address', params);
      const res = await this.appService.getUserData(params.address);
      return {
        statusCode: 200,
        data: [...res],
      };
    } catch (e) {
      console.log('error ===>', e);
      throw e;
    }
  }

  @Post()
  async castVote(
    @Body('nullifier') identityNullifier: string,
    @Body('trapdoor') trapdoor: string,
    @Body('secret') secret: string,
    @Body('contributer') contributer: string,
    @Body('votingNullifier') votingNullifier: bigint,
    @Body('CIRCLE_ID') CIRCLE_ID: string,
  ): Promise<any> {
    try {
      const res = await this.appService.castVote({
        identityNullifier,
        trapdoor,
        secret,
        contributer,
        votingNullifier,
        CIRCLE_ID,
      });
      return {
        statusCode: 200,
        data: [res],
      };
      // return true
    } catch (e) {
      console.log('error ===>', e);
      throw e;
    }
  }

  @Post('becomeVoter')
  async becomeVoter(
    @Body('IC') IC: bigint,
    @Body('CIRCLE_ID') CIRCLE_ID: string,
  ): Promise<any> {
    try {
      const res = await this.appService.becomeVoter({ IC, CIRCLE_ID });

      return {
        statusCode: 200,
        data: [res],
      };
    } catch (e) {
      console.log('error ---', e);
      throw e;
    }
  }

  @Post('saveIndex')
  async saveIndex(
    @Body('IC') IC: string,
    @Body('index') index: number,
    @Body('CIRCLE_ID') CIRCLE_ID: string,
  ): Promise<any> {
    try {
      await this.appService.saveIndex({ IC, index, CIRCLE_ID });

      return {
        statusCode: 200,
        data: [],
      };
    } catch (e) {
      console.log('error ---', e);
      throw e;
    }
  }

  @Post('withdraw')
  async withdraw(
    @Body('votingNullifier') votingNullifier: bigint,
    @Body('CIRCLE_ID') CIRCLE_ID: string,
  ): Promise<any> {
    try {
      const res = await this.appService.withdraw({
        CIRCLE_ID,
        votingNullifier,
      });
      return {
        statusCode: 200,
        data: [res],
      };
    } catch (e) {
      console.log('error ---', e);
      throw e;
    }
  }

  @Post('getIndex')
  async getIndex(@Body('CIRCLE_ID') CIRCLE_ID: string): Promise<any> {
    try {
      const res = await this.appService.getIndex({ CIRCLE_ID });
      return {
        statusCode: 200,
        data: [res],
      };
    } catch (e) {
      console.log('error ---', e);
      throw e;
    }
  }

  @Get()
  dummyRoute() {
    console.log('get request');
    return { data: 'hello' };
  }
}
