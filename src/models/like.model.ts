import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import Users from './users.model';
import Recipes from './recipes.model';

@Table
export default class Like extends Model<Like> {
  @ForeignKey(() => Users)
  @Column
  userId: number;

  @ForeignKey(() => Recipes)
  @Column
  recipeId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
