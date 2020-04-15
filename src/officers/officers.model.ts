import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Officer extends Model<Officer> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isFree: boolean;
}