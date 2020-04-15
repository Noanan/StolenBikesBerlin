import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SequelizeModule } from '@nestjs/sequelize';

import { BikesModule } from './bikes/bikes.module';
import { Bike } from './bikes/bikes.model';
import { OfficersModule } from './officers/officers.module';
import { Officer } from './officers/officers.model';


@Module({

  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      autoLoadModels: true,
      synchronize: true,
      models: [Bike, Officer],
    }),
    BikesModule,
    OfficersModule,
    

  ],
  controllers: [AppController],
  providers: [AppService]

})

export class AppModule {}