'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Peliculas', [{
      imagen: 'URL imagen 1',
      titulo: 'John Doe',
      fechaCreacion: new Date().toISOString().slice(0, 19).replace('T', ' '),
      calificacion: 4
        }], {});
    
    },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
