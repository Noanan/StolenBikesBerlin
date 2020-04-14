import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BikesModule } from './bikes/bikes.module';



import { SequelizeModule } from '@nestjs/sequelize';
import { Bike } from './bikes/bikes.model';


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
      models: [Bike],
    }),
    BikesModule,

  ],

})

export class AppModule {}