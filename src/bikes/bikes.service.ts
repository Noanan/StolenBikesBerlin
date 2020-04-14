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
        bike.firstName = createBikeDto.firstName;
        bike.lastName = createBikeDto.lastName;
        return bike.save();

    }



    async findAll(): Promise<Bike[]> {
        try {
            await this.sequelize.transaction(async t => {
                const transactionHost = { transaction: t };
                await this.bikeModel.create(
                    { firstName: 'Abraham', lastName: 'Lincoln' },
                    transactionHost,

                );
                await this.bikeModel.create(
                    { firstName: 'John', lastName: 'Boothe' },
                    transactionHost,

                );

            });

        } catch (err) {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback
        }

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