import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  Column,
  HasMany,
} from 'sequelize-typescript';

import Users from './users.model';
import Comments from './comments.model';
import Like from './like.model';

@Table
export default class Recipes extends Model<Recipes> {
  @ForeignKey(() => Users)
  @Column
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

  @HasMany(() => Comments)
  comments: Comments[];

  @HasMany(() => Like)
  likes: Like[];
}
