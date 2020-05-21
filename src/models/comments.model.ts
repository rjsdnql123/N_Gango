import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  Column,
  BelongsTo,
} from 'sequelize-typescript';

import Users from './users.model';
import Recipes from './recipes.model';

@Table
export default class Comments extends Model<Comments> {
  @ForeignKey(() => Users)
  @Column
  userId: number;

  @ForeignKey(() => Recipes)
  @Column
  recipId: number;

  @Column
  comment: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Recipes)
  recipe: Recipes;

  @BelongsTo(() => Users)
  user: Users;
}
