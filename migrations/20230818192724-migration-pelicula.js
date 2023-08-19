'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Peliculas', 'Director', {
      type: Sequelize.STRING, // Tipo de la nueva columna
      allowNull: true, // Si es permitido o no el valor nulo
      defaultValue: 'James Cameron', // Valor por defecto
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
