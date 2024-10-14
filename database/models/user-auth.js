import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

//Stores user-authdata
class UserAuth extends Model {}

UserAuth.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: "id",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "email",
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      field: "password_hash",
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      field: "refresh_token",
    },
    userLevel: {
      type: DataTypes.ENUM("guest", "client", "admin"),
      defaultValue: "guest",
      allowNull: false,
      field: "user_level",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active",
    },
    lastLogin: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "last_login",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    sequelize, // Instance of Sequelize
    tableName: "user_auth",
    timestamps: true,
  }
);

export default UserAuth;

/*
const roles = 
{
  admin: ['read', 'write', 'delete'],
  user: ['read'],
  guest: [],
};
*/
