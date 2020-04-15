import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Bike extends Model<Bike> {
  @Column
  bikeID: string;

  @Column
  ownerFirstName: string;

  @Column
  ownerLastName: string;
  
  @Column({ defaultValue: true })
  isMissing: boolean;
}