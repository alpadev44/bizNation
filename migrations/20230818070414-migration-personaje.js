'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Personajes', 'Profesion', {
      type: Sequelize.STRING, // Tipo de la nueva columna
      allowNull: true, // Si es permitido o no el valor nulo
      defaultValue: 'programador', // Valor por defecto
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Personajes', 'Profesion');
  }
};
