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
import Recipes from './recipes.model';

@Table
export default class StuffRecipe extends Model<StuffRecipe> {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @ForeignKey(() => Stuffs)
  @Column
  stuffId: number;

  @ForeignKey(() => Recipes)
  @Column
  recipeId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
