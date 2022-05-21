module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 15],
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 15],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      has_subscription: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.ENUM("Enable", "Disable", "Deleted"),
        allowNull: false,
        defaultValue: "Enable",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [8, 300] },
      },
      profile_picture_url: {
        type: DataTypes.STRING,
        defaultValue:
          "https://i.pinimg.com/originals/35/9d/1d/359d1d33ca0cca4e58b7a8113c2977c1.jpg",
      },
      container: {
        type: DataTypes.STRING,
      },
      port: {
        type: DataTypes.INTEGER,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        defaultValue: 0,
      },
    },
    { timestamps: false, updatedAt: false }
  );

  users.associate = (models) => {
    users.hasMany(models.projects, {
      onDelete: "Cascade",
      onUpdate: "Cascade",
      foreignKey: "user_id",
    });

    users.hasMany(models.notifications, {
      onDelete: "Cascade",
      onUpdate: "Cascade",
      foreignKey: "user_id",
    });

    // users.hasMany(models.logs, {
    //   onDelete: "Cascade",
    //   onUpdate: "Cascade",
    //   foreignKey: "user_id",
    // });

    users.belongsToMany(models.projects, { through: "repositories" });
  };
  return users;
};
