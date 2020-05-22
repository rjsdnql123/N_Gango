import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  HasMany,
  HasOne,
  BelongsToMany,
} from 'sequelize-typescript';
import Stuffs from './stuffs.model';
import StuffCategory from './stuff_category.model';

@Table
export default class Category extends Model<Category> {
  @Column
  name: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsToMany(
    () => Stuffs,
    () => StuffCategory
  )
  stuffs: Stuffs[];
}
