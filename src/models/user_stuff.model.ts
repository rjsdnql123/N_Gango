import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  Column,
  PrimaryKey,
} from 'sequelize-typescript';

import Users from './users.model';
import Stuff from './stuffs.model';

@Table
export default class UserStuff extends Model<UserStuff> {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @ForeignKey(() => Users)
  @Column
  userId: number;

  @ForeignKey(() => Stuff)
  @Column
  stuffId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
