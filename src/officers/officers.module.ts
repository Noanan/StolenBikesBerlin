import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Officer } from './officers.model';
import { OfficersService } from './officers.service';
import { OfficersController } from './officers.controller';

@Module({
  imports: [SequelizeModule.forFeature([Officer])],
  providers: [OfficersService],
  controllers: [OfficersController]
})
export class OfficersModule {}
