import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

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

  @Get(':id/isFree')
  OfficerisFree(@Param('id') id: string): Promise<void> {
    return this.officersService.OfficerisFree(id);
  }

  @Get(':id/isBusy')
  OfficerisBusy(@Param('id') id: string): Promise<void> {
    return this.officersService.OfficerisBusy(id);
  }

  @Get(':id/setOfficerCaseId/:caseID')
  setOfficerCaseId(@Param('id') id: string,@Param('caseID') caseID: string, ): Promise<void> {
    return this.officersService.setOfficerCaseId(id,caseID);
  }




  @Get()
  findAll(): Promise<Officer[]> {
    return this.officersService.findAll();
  }

  @Get('/isFree')
  findAllAvailable(): Promise<Officer[]> {
    return this.officersService.findAllAvailable();
  }

  @Get('/FirstisFree')
  findFirstAvailable(): Promise<Officer> {
    return this.officersService.findFirstAvailable();
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