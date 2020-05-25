import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  Column,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';

import Users from './users.model';
import Recipes from './recipes.model';

@Table
export default class Comments extends Model<Comments> {
  @ForeignKey(() => Users)
  @Column({ onDelete: 'CASCADE' })
  userId: number;

  @ForeignKey(() => Recipes)
  @Column({ onDelete: 'CASCADE' })
  recipId: number;

  @Column
  comment: string;

  @Column({ type: DataType.FLOAT })
  rating: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Recipes)
  recipe: Recipes;

  @BelongsTo(() => Users)
  user: Users;
}
