module.exports = (sequelize, DataTypes) => {
  const repositories = sequelize.define(
    "repositories",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    { timestamps: true }
  );

  return repositories;
};
