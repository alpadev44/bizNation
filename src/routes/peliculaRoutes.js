const express = require('express')
const { createMovieController, getAllMovieController, detailsMovieController, updateMovieController, deleteMovieController, restoreMovieController } = require('../controller/peliculaController.js');
const authenticateJWT = require('../middleware/auth.js')
const routerPelicula = express.Router()

/**
 * @openapi
 * /movie/createMovie:
 *   post:
 *     tags:
 *       - movie
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                    $ref: "#/components/schemas/movie"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
routerPelicula.post('/createMovie',authenticateJWT, createMovieController)

/**
 * @openapi
 * /movie:
 *   get:
 *     tags:
 *       - movie
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/movie"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: array
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
routerPelicula.get('/',authenticateJWT, getAllMovieController)

/**
 * @openapi
 * /movie/:id:
 *   get:
 *     tags:
 *       - movie
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: "#/components/schemas/movie"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
routerPelicula.get('/:id',authenticateJWT, detailsMovieController)


/**
 * @openapi
 * /movie/:id:
 *   put:
 *     tags:
 *       - movie
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: string
 *                   example: succesfull update
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
routerPelicula.put('/:id',authenticateJWT, updateMovieController)

/**
 * @openapi
 * /movie/:id:
 *   delete:
 *     tags:
 *       - movie
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: string
 *                   example: item deleted
 *                   
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
routerPelicula.delete('/:id',authenticateJWT, deleteMovieController)

/**
 * @openapi
 * /movie/:id/restore:
 *   put:
 *     tags:
 *       - movie
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: string
 *                   example: item restored
 *                   
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
routerPelicula.put('/:id/restore', authenticateJWT,restoreMovieController)

module.exports = routerPelicula