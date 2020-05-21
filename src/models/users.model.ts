import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
  HasMany,
  BeforeValidate,
} from 'sequelize-typescript';

import Follow from './follow.model';
import Stuffs from './stuffs.model';
import UserStuff from './user_stuff.model';
import Recipes from './recipes.model';
import Comments from './comments.model';
import { hashing } from '../helper/crypto';
import Like from './like.model';

@Table
export default class Users extends Model<Users> {
  @Column
  email: string;

  @Column
  password: string;

  @Column
  username: string;

  @Column
  token: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsToMany(
    () => Users,
    () => Follow,
    'userId',
    'id'
  )
  followers: Users[];

  @BelongsToMany(
    () => Users,
    () => Follow,
    'followId',
    'id'
  )
  followings: Users[];

  @BelongsToMany(
    () => Stuffs,
    () => UserStuff
  )
  stuffs: Stuffs[];

  @HasMany(() => Recipes)
  recipes: Recipes[];

  @HasMany(() => Comments)
  comments: Comments[];

  @BelongsToMany(
    () => Recipes,
    () => Like,
    'userId'
  )
  likes: Recipes[];

  @BeforeValidate
  static setPassword(instance: Users) {
    instance.password = hashing(instance.password);
  }
}
