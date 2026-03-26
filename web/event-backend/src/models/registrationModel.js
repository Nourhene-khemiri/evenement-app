const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./userModel");
const Event = require("./eventModel");

const Registration = sequelize.define(
  "Registration",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },

    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "events", key: "id" },
    },
  },
  {
    tableName: "registrations",
    timestamps: true,

    indexes: [
      {
        unique: true,
        fields: ["user_id", "event_id"], // un user ne peut s'inscrire qu'une fois
      },
    ],
  },
);

// Associations
User.hasMany(Registration, { foreignKey: "user_id" });
Registration.belongsTo(User, { foreignKey: "user_id" });

Event.hasMany(Registration, { foreignKey: "event_id" });
Registration.belongsTo(Event, { foreignKey: "event_id" });

module.exports = Registration;
