/**
 * @openapi
 * components:
 *   schemas:
 *     movie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 25
 *         titulo:
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
 *         calificacion:
 *           type: integer
 *           example: 5
 */

module.exports = (sequelize, DataTypes) => {
  const Pelicula = sequelize.define(
    "Pelicula",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      imagen: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      titulo: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      fechaCreacion: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      calificacion: {
        allowNull: true,
        type: DataTypes.INTEGER,
        validate: { min: 0, max: 5 },
      },
    }
  );

  Pelicula.associate = (models) =>{
    Pelicula.belongsToMany(models.Personaje, {through: 'personajePeliculas'});
    Pelicula.belongsToMany(models.Genero, {through: 'generoPeliculas'});
  }

  return Pelicula;
};
