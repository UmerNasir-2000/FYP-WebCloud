module.exports = (sequelize, DataTypes) => {
  const ports = sequelize.define(
    "ports",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      port_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Occupied", "Idle"),
        allowNull: false,
        defaultValue: "Idle",
      },
    },
    { timestamps: false, updatedAt: false, createdAt: false }
  );

  return ports;
};
