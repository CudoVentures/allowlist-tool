module.exports = {
  async up(queryInterface, Sequelize) {
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
