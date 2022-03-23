module.exports = (sequelize, DataTypes) => {
  const configurations = sequelize.define(
    "configurations",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      db_port: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      web_port: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      database: {
        type: DataTypes.ENUM("MySQL", "MongoDB"),
        allowNull: false,
      },
      web_framework: {
        type: DataTypes.ENUM(
          "PHP",
          "Node.js",
          "Nest.js",
          "Dotnet",
          "Spring Boot"
        ),
        allowNull: false,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: true, updatedAt: false, createdAt: true }
  );

  return configurations;
};
