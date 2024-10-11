import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

class Portfolio extends Model {}

Portfolio.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Array to store up to 25 image URLs or file paths
      allowNull: true,
      validate: {
        maxImages(value) {
          if (value && value.length > 25) {
            throw new Error("You can only upload up to 25 images.");
          }
        },
        isArray(value) {
          if (value && !Array.isArray(value)) {
            throw new Error("Images must be an array of strings.");
          }
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true, // Ensure price is a valid decimal number
        min: 0, // Ensure price is not negative
      },
    },
    location: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    isRentalOrSale: {
      type: DataTypes.ENUM("rental", "sale"),
      defaultValue: "rental",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 10000], // Description length should not exceed 10000 characters
      },
    },
    deedType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    portfolioType: {
      type: DataTypes.STRING, // İşyeri, Ev, Arsa, Tarla
      allowNull: true,
    },
    netSize: {
      type: DataTypes.INTEGER, // Net m2
      allowNull: true,
      validate: {
        isInt: true,
        min: 0,
      },
    },
    numberOfRooms: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        min: 0,
      },
    },
    ageOfTheStructure: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        min: 0,
      },
    },
    floorNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    heatingType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isSuitableToMorgage: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
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
    timestamps: true,
    tableName: "portfolio",
  }
);
export default Portfolio;
