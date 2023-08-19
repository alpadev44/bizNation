const Genero  = require('../models/index').Genero;
const Pelicula = require('../models/index').Pelicula;

async function createGenreService(data) {
    try {
        Genero.findAll({
            include: {
                model: Pelicula
            }
        })
        return await Genero.create(data)
    }
    catch (err) {
        throw err
    }
};

async function getAllGenreService() {
    try {
        return await Genero.findAll()
    }
    catch (err) {
        throw err
    }
}

async function detailsGenreService(id) {
    try {
        return await Genero.findByPk(id);
    } catch (err) {
        throw err;
    }
};

async function updateGenreService(id, data) {
    try {
        await Genero.update(data, { where: { id: id } });
        return await this.details(id);
    } catch (err) {
        throw err;
    }
};

async function deleteGenreService(id) {
    try {
        return await Genero.destroy({ where: { id: id } }); // Esto será un soft delete
    } catch (err) {
        throw err;
    }
};

module.exports = { createGenreService, getAllGenreService, detailsGenreService, updateGenreService, deleteGenreService }