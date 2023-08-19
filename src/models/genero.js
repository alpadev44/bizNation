/**
 * @openapi
 * components:
 *   schemas:
 *     genre:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 25
 *         name:
 *           type: string
 *           example: terror
 *         image:
 *            type: string
 *            example: https://image.jgp
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 */

module.exports = (sequelize, DataTypes) => {
  const Genero = sequelize.define("Genero", {
    id: {
      allowNull: true,
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    imagen: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  });

  Genero.associate = (models) => {
    Genero.belongsToMany(models.Pelicula, {through: 'generoPeliculas'});
  };

  return Genero;
};
