import { Controller, Get, Post, Body, Patch, Param,Delete } from '@nestjs/common';
import { RobotsService } from './robots.service';
import { Robot } from './robot.interface';

@Controller('robots')
export class RobotsController {
  constructor(private readonly robotsService: RobotsService) {}
    @Get()
    async findAll() {
    const result=await this.robotsService.findAll();
    console.log('Controller returning', result);
      return result;
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.robotsService.findOne(id);
    }
    @Get("name/:name")
    findOneByName(@Param('name') name: string) {
      return this.robotsService.findOneByName(name);
    }
  @Post()
  create(@Body() robot: Robot) {
      return this.robotsService.create(robot);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.robotsService.remove(id);
  }
}
