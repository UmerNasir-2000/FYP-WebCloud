module.exports = (sequelize, DataTypes) => {
  const projects = sequelize.define(
    "projects",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      project_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 50],
        },
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      description: {
        type: DataTypes.STRING,
      },
      is_public: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false, updatedAt: false }
  );

  projects.associate = (models) => {
    projects.hasMany(models.requests, {
      onDelete: "Cascade",
      onUpdate: "Cascade",
      foreignKey: "project_id",
    });

    projects.hasOne(models.configurations, {
      onDelete: "Cascade",
      onUpdate: "Cascade",
      foreignKey: "project_id",
    });

    projects.belongsToMany(models.users, { through: "repositories" });
  };

  return projects;
};
