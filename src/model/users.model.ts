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
import { hashing } from '../helper/crypto';
import Follow from './follow.model';
import Stuffs from './stuffs.model';
import UserStuff from './user_stuff.model';
import Recipes from './recipes.model';
import Comments from './comments.model';

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
    'userId'
  )
  followers: Users[];

  @BelongsToMany(
    () => Users,
    () => Follow,
    'followId'
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

  @BeforeValidate
  static setPassword(instance: Users) {
    instance.password = hashing(instance.password);
  }
}
