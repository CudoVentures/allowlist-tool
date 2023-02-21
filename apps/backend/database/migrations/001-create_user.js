module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          type: Sequelize.INTEGER,
        },
        address: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: true,
        },
        twitter_profile_id: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: true,
        },
        twitter_profile_username: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: true,
        },
        twitter_access_token: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: true,
        },
        twitter_refresh_token: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: true,
        },
        discord_profile_id: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: true,
        },
        discord_profile_username: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: true,
        },
        discord_access_token: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: true,
        },
        discord_refresh_token: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });

      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
