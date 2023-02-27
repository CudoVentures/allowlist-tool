module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('users', 'email', {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      });
      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'email');
  },
};
