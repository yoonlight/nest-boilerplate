import { Controller, Get, Post, Patch, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @Get()
  listHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  getHello(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Post()
  createHello(): string {
    return this.appService.getHello();
  }

  @Patch()
  updateHello(): string {
    return this.appService.getHello();
  }

  @Delete()
  deleteHello(): string {
    return this.appService.getHello();
  }
}
