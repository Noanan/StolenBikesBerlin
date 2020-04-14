import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateBikeDto } from './dto/create-bike.dto';

import { Bike } from './bikes.model';

import { BikesService } from './bikes.service';



@Controller('bikes')

export class BikesController {
  constructor(private readonly bikesService: BikesService) {}

  @Post()
  create(@Body() createBikeDto: CreateBikeDto): Promise<Bike> {
    return this.bikesService.create(createBikeDto);
  }


  @Get()
  findAll(): Promise<Bike[]> {
    return this.bikesService.findAll();
  }



  @Get(':id')
  findOne(@Param('id') id: string): Promise<Bike> {
    return this.bikesService.findOne(id);

  }


  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.bikesService.remove(id);

  }

}