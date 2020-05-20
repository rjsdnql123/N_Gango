import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import Category from './category.model';
import Users from './users.model';
import UserStuff from './user_stuff.model';

@Table
export default class Stuffs extends Model<Stuffs> {
  @Column
  stuffname: string;

  @Column
  limitday: string;

  @Column
  icon: string;

  @ForeignKey(() => Category)
  @Column
  category: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsToMany(
    () => Users,
    () => UserStuff
  )
  users: Users[];
}
