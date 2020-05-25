import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  Column,
  HasMany,
  BelongsToMany,
  BelongsTo,
} from 'sequelize-typescript';

import Users from './users.model';
import Comments from './comments.model';
import Like from './like.model';
import Stuffs from './stuffs.model';
import StuffRecipe from './stuff_recipe.model';

@Table
export default class Recipes extends Model<Recipes> {
  @ForeignKey(() => Users)
  @Column({ onDelete: 'SET NULL' })
  userId: number;

  @Column
  name: string;

  @Column
  desc: string;

  @Column
  image: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Users)
  makeUser: Users;

  @HasMany(() => Comments)
  comments: Comments[];

  @BelongsToMany(() => Stuffs, () => StuffRecipe)
  stuff: Stuffs[];

  @BelongsToMany(() => Users, () => Like, "recipeId")
  likes: Users[];
}
