module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('allowlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      admins: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      end_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      twitter_account: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      tweet: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      discord_server: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      server_role: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      project_chain_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      users: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
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
