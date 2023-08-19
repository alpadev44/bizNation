/**
 * @openapi
 * components:
 *   schemas:
 *     character:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 25
 *         nombre:
 *           type: string
 *           example: jhon
 *         image:
 *            type: string
 *            example: https://image.jgp
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         edad:
 *           type: integer
 *           example: 5
 *         historia:
 *           type: integer
 *           example: aa
 */

module.exports = (sequelize, DataTypes) => {
  const Personaje = sequelize.define(
    "Personaje",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nombre: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      edad: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      peso: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      historia: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    }
  );

  Personaje.associate = (models) => {
    Personaje.belongsToMany(models.Pelicula, {through: 'personajePeliculas'});
  };
    
  return Personaje;

};

