import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';
import Users from './users.model';
import Recipes from './recipes.model';

@Table
export default class Like extends Model<Like> {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

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
