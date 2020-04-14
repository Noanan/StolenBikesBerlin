import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Bike extends Model<Bike> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}