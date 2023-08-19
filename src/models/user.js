/**
 * @openapi
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 25
 *         username:
 *           type: string
 *           example: root
 *         password:
 *            type: string
 *            example: root
 *       
 */
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      id: {
        allowNull: true,
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    })
    return User
}
