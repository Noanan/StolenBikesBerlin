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
        officer.caseID = createOfficerDto.caseID;
        officer.available = createOfficerDto.available
        return officer.save();

    }

    async OfficerisFree(id: string): Promise<void> {
        const officer = await this.findOne(id);
        officer.available = true;

        await officer.save();
    }

    async OfficerisBusy(id: string): Promise<void> {
        const officer = await this.findOne(id);
        officer.available = false;

        await officer.save();
    }

    async setOfficerCaseId(id: string, caseID: string): Promise<void> {
        const officer = await this.findOne(id);
        officer.caseID = caseID;

        await officer.save();
    }

    async findAll(): Promise<Officer[]> {
        return this.officerModel.findAll();
    }

     findAllAvailable(): Promise<Officer[]> {
        return this.officerModel.findAll({
            where: {
              available: true,
            }
          });
    }

     findFirstAvailable(): Promise<Officer> {
        return this.officerModel.findOne({
            where: {
              available: true,
            },
          });
    }

    findOne(id: string): Promise<Officer> {
        return this.officerModel.findOne({
            where: {id,
            },
        });
    }
    findOneCaseID(caseID: string): Promise<Officer> {
        return this.officerModel.findOne({
            where: {caseID,
            },
        });
    }


    async remove(id: string): Promise<void> {
        const officer = await this.findOne(id);
        await officer.destroy();
    }

}