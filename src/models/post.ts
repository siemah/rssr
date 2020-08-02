import { Optional, Model, DataTypes } from "sequelize";
import sequelize from '../config/db';

// These are all the attributes in the User model
interface UserAttributes {
  id: number;
  title: string;
  content: string | null;
}
// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public title!: string;
  public content!: string | null; // for nullable fields

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    content: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
  },
  {
    tableName: "posts",
    sequelize,
  }
);

export default User;