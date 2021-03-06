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
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: true, updatedAt: false, createdAt: true }
  );

  projects.associate = (models) => {
    projects.hasMany(models.requests, {
      onDelete: "Cascade",
      onUpdate: "Cascade",
      foreignKey: "project_id",
    });

    projects.hasMany(models.project_history, {
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
