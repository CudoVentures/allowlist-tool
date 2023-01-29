module.exports = {
    async up(queryInterface, Sequelize) {
        const t = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.createTable('twitter_users', {
                twitter_profile_id: {
                    type: Sequelize.STRING,
                    unique: true,
                    primaryKey: true,
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
        await knex.schema.dropTable('users')
    },
};
