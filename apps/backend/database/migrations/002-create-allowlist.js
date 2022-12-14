module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('allowlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      admin: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      users: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cosmos_chain_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      website: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      twitter_account: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      discord_url: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      end_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      image: {
        allowNull: false,
        type: Sequelize.BLOB,
      },
      banner_image: {
        allowNull: false,
        type: Sequelize.BLOB,
      },

      twitter_account_to_follow: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      tweet_to_like: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      tweet_to_retweet: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      discord_invite_link: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      server_role: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      require_email: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
