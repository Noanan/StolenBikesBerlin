import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateOfficerDto } from './dto/create-officer.dto';

import { Officer } from './officers.model';

import { OfficersService } from './officers.service';



@Controller('officers')

export class OfficersController {
  constructor(private readonly officersService: OfficersService) {}

  @Post()
  create(@Body() createOfficerDto: CreateOfficerDto): Promise<Officer> {
    return this.officersService.create(createOfficerDto);
  }


  @Get()
  findAll(): Promise<Officer[]> {
    return this.officersService.findAll();
  }



  @Get(':id')
  findOne(@Param('id') id: string): Promise<Officer> {
    return this.officersService.findOne(id);

  }


  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.officersService.remove(id);

  }

}