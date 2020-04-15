import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Officer } from './officers.model';
import { Sequelize } from 'sequelize-typescript';
import { CreateOfficerDto } from './dto/create-officer.dto';

@Injectable()

export class OfficersService {

    constructor(

        @InjectModel(Officer)
        private readonly officerModel: typeof Officer,
        private readonly sequelize: Sequelize,

    ) { }



    create(createOfficerDto: CreateOfficerDto): Promise<Officer> {
        const officer = new Officer();
        officer.firstName = createOfficerDto.firstName;
        officer.lastName = createOfficerDto.lastName;
        officer.isFree = createOfficerDto.isFree;
        
        return officer.save();

    }



    async findAll(): Promise<Officer[]> {
        return this.officerModel.findAll();
    }



    findOne(id: string): Promise<Officer> {
        return this.officerModel.findOne({
            where: {id,
            },
        });

    }
    async remove(id: string): Promise<void> {
        const officer = await this.findOne(id);
        await officer.destroy();
    }

}