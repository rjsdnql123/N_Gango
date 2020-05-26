import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsToMany,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import Category from './category.model';
import Users from './users.model';
import UserStuff from './user_stuff.model';
import StuffCategory from './stuff_category.model';
import Recipes from './recipes.model';
import StuffRecipe from './stuff_recipe.model';

@Table
export default class Stuffs extends Model<Stuffs> {
  @Column
  stuffname: string;

  @Column
  limitDay: number;

  @Column
  icon: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsToMany(
    () => Users,
    () => UserStuff
  )
  users: Users[];

  @BelongsToMany(() => Recipes, () => StuffRecipe)
  recipe: Recipes[];

  @BelongsToMany(
    () => Category,
    () => StuffCategory
  )
  category: Category[];
  collate:'utf8_general_ci'
}
