const knex = require("knex")


module.exports = {
    async up(queryInterface, Sequelize) {
        const t = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable('discord_users', {
                discord_profile_id: {
                    type: Sequelize.STRING,
                    unique: true,
                    allowNull: false,
                    primaryKey: true,
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
            console.log(error)
        }
    },
    async down(queryInterface, Sequelize) {
        queryInterface.dropTable('users')
    },
};
