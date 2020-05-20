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

@Table
export default class Follow extends Model<Follow> {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @ForeignKey(() => Users)
  @Column
  userId: number;

  @ForeignKey(() => Users)
  @Column
  followId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
