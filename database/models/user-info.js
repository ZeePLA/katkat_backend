import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

//Stores user-metadata
class UserInfo extends Model {}

UserInfo.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: "id",
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "last_name",
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
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "phone_number",
    },
    location: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING, //Store the URL or file path of uploaded image.
      allowNull: true,
    },
    personalLinks: {
      type: DataTypes.ARRAY(DataTypes.STRING), //Array to store multiple links: [linkedin, instagram, twitter, ...]
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active",
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
    tableName: "user_info",
    timestamps: true,
  }
);

export default UserInfo;
