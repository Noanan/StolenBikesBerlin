import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bike } from './bikes.model';
import { BikesService } from './bikes.service';
import { BikesController } from './bikes.controller';

@Module({
  imports: [SequelizeModule.forFeature([Bike])],
  providers: [BikesService],
  controllers: [BikesController]
})
export class BikesModule {}
