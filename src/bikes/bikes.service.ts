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
        bike.isMissing = createBikeDto.isMissing

        return bike.save();

    }



    async findAll(): Promise<Bike[]> {
        return this.bikeModel.findAll();
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