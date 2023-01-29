module.exports = {
    async up(queryInterface, Sequelize) {
     const t = await queryInterface.sequelize.transaction();
  
      try {
        await queryInterface.createTable('users', {
          address: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false,
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
          discord_profile_id: {
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
  