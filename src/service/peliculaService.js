const { Op } = require('sequelize');
const Pelicula = require('../models/index').Pelicula;
const Genero = require('../models/index').Genero;
const Personaje = require('../models/index').Personaje

async function createMoviesService({
    imagen,
    titulo,
    fechaCreacion,
    calificacion,
    genero
}) {
    try {

        let pelicula = await Pelicula.create({ imagen, titulo, fechaCreacion, calificacion })
        await pelicula.setGeneros(genero)

        return pelicula;
    }
    catch (err) {
        throw err
    }
};

async function getAllMoviesService() {
    try {
        return await Pelicula.findAll({
            attributes: ['imagen', 'titulo', 'fechaCreacion'] 
        })
    }
    catch (err) {
        throw err
    }
}

async function detailsMoviesService(id) {
    try {
        return await Pelicula.findByPk(id,{include:[{
            model: Personaje
          } ]} )
            
        
    } catch (err) {
        throw err;
    }
};

async function updateMoviesService(id, data) {
    try {
        await Pelicula.update(data, { where: { id: id } });
        return await this.details(id);
    } catch (err) {
        throw err;
    }
};

async function deleteMoviesService(id) {
    try {
        return await Pelicula.destroy({ where: { id: id } }); // Esto será un soft delete
    } catch (err) {
        throw err;
    }
};

async function restoreMovieService(id) {
    try {
      console.log(id + "antes");
      const pelicula = await Pelicula.findOne({
        where: { id: id },
        paranoid: false,
      });
      console.log(id + " despues");
      if (!pelicula) {
        throw new Error("No se encontró la pelicula con el ID especificado.");
      }
  
      if (!pelicula.deletedAt) {
        throw new Error("la pelicula no está eliminado.");
      }
  
      await pelicula.restore();
  
      return pelicula;
    } catch (err) {
      throw err;
    }
}

async function searchMoviesService(data) {
    const { titulo, genero, orden } = data;

    let whereCondition = {};
    let orderCondition = [];

    if (titulo) {
        whereCondition.titulo = { [Op.like]: `%${titulo}%` };
    }

    if (genero) {
        whereCondition.genreId = genero;
    }


    if (orden) {
        orderCondition.push(['fechaCreacion', orden]);
    }

    try {
        return await Pelicula.findAll({
            where: whereCondition,
            order: orderCondition.length ? [orderCondition] : undefined,
            include: [{
                model: Genero,
                attributes: ['nombre'],  
            }],
        });
    } catch (err) {
        throw err;
    }
}


module.exports = { createMoviesService, getAllMoviesService, detailsMoviesService, updateMoviesService, deleteMoviesService,restoreMovieService, searchMoviesService }