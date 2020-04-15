import { Body, Controller, Delete, Get, Param, Post, Put,Redirect } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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

  @Get(':id/found')
  foundBike(@Param('id') id: string): Promise<void> {
    return this.bikesService.foundBike(id);
  }

  @Get(':id/lost')
  lostBike(@Param('id') id: string): Promise<void> {
    return this.bikesService.lostBike(id);
  }
  @Get(':id/hasOfficer')
  hasOfficer(@Param('id') id: string): Promise<void> {
    return this.bikesService.hasOfficer(id);
  }
  @Get(':id/hasNoOfficer')
  hasNoOfficer(@Param('id') id: string): Promise<void> {
    return this.bikesService.hasNoOfficer(id);
  }

  @Get()
  findAll(): Promise<Bike[]> {
    return this.bikesService.findAll();
  }


  @Get('/AllNoOfficer')
  findAllNoOfficer(): Promise<Bike[]> {
    return this.bikesService.findAllNoOfficer();
  }

  @Get('/countAllNoOfficer')
  countAllNoOfficer() {
    return this.bikesService.countAllNoOfficer();
  }

  @Get('/FirstNoOfficer')
  findFirstNoOfficer(): Promise<Bike> {
    return this.bikesService.findFirstNoOfficer();
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