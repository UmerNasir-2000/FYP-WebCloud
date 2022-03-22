module.exports = (sequelize, DataTypes) => {
  const requests = sequelize.define(
    "requests",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      acknowledged_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
        allowNull: false,
        defaultValue: "Pending",
      },
    },
    { timestamps: false, updatedAt: false }
  );

  return requests;
};
