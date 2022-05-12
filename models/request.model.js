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
        defaultValue: "ADMIN",
      },
      status: {
        type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
        allowNull: false,
        defaultValue: "Approved",
      },
      project_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: true }
  );

  return requests;
};
