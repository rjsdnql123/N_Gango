import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';

import Stuffs from './stuffs.model';
import Category from './category.model';

@Table
export default class StuffCategory extends Model<StuffCategory> {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @ForeignKey(() => Stuffs)
  @Column
  stuffId: number;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
