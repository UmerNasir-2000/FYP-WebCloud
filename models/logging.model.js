module.exports = (sequelize, DataTypes) => {
  const logs = sequelize.define(
    "logs",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      ip_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 50],
        },
      },
      request_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      request_body: {
        type: DataTypes.TEXT,
      },
      request_method: {
        type: DataTypes.ENUM("GET", "POST", "PUT", "PATCH", "DELETE"),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false, updatedAt: false }
  );

  return logs;
};
