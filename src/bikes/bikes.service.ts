import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bike } from './bikes.model';
import { Sequelize } from 'sequelize-typescript';
import { CreateBikeDto } from './dto/create-bike.dto';


@Injectable()

export class BikesService {

    constructor(

        @InjectModel(Bike)
        private readonly bikeModel: typeof Bike,
        private readonly sequelize: Sequelize,

    ) { }



    create(createBikeDto: CreateBikeDto): Promise<Bike> {
        const bike = new Bike();
        bike.bikeID = createBikeDto.bikeID;
        bike.ownerFirstName = createBikeDto.ownerFirstName;
        bike.ownerLastName = createBikeDto.ownerLastName;
        bike.resolved = createBikeDto.resolved;
        bike.hasOfficer = createBikeDto.hasOfficer;
        return bike.save();

    }

    async foundBike(id: string): Promise<void> {
        const bike = await this.findOne(id);
        bike.resolved = true;

        await bike.save();
    }

    async lostBike(id: string): Promise<void> {
        const bike = await this.findOne(id);
        bike.resolved = false;

        await bike.save();
    } 

    async hasOfficer(id: string): Promise<void> {
        const bike = await this.findOne(id);
        bike.hasOfficer = true;

        await bike.save();
    } 
    async hasNoOfficer(id: string): Promise<void> {
        const bike = await this.findOne(id);
        bike.hasOfficer = false;

        await bike.save();
    } 

    async findAll(): Promise<Bike[]> {
        return this.bikeModel.findAll();
    }


    findAllNoOfficer(): Promise<Bike[]> {
        return this.bikeModel.findAll({
            where: {
                hasOfficer: false,
            }
          });
    }

    async countAllNoOfficer() {
        var count = 0;
        var model =  await this.bikeModel.findAll({
            where: {
                hasOfficer: false,
            }
        });

        model.forEach(element => {
            count += 1;            
                  });
          return count;
    }

    findFirstNoOfficer(): Promise<Bike> {
        return this.bikeModel.findOne({
            where: {
                hasOfficer: false,
            },
          });
    }

    findOneBikeID(bikeID: string): Promise<Bike> {
        return this.bikeModel.findOne({
            where: {bikeID,
            },
        });
    }
  

    findOne(id: string): Promise<Bike> {
        return this.bikeModel.findOne({
            where: {id,
            },
        });

    }
    async remove(id: string): Promise<void> {
        const bike = await this.findOne(id);
        await bike.destroy();
    }

}