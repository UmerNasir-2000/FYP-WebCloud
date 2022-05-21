module.exports = (sequelize, DataTypes) => {
  const notifications = sequelize.define(
    "notifications",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      owner_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: true, createdAt: true, updatedAt: false }
  );

  return notifications;
};
