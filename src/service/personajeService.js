const { where } = require("sequelize");
const { Op } = require("sequelize");
const Personaje = require("../models/index").Personaje;
const Pelicula = require("../models/index").Pelicula;

async function createCharacterService({
  imagen,
  nombre,
  edad,
  historia,
  pelicula,
}) {
  try {
    console.log(Personaje);
    let personaje = await Personaje.create({ imagen, nombre, edad, historia });

    await personaje.setPeliculas(pelicula);

    return personaje;
  } catch (err) {
    throw err;
  }
}

async function getAllCharacterService() {
  try {
    return await Personaje.findAll({
      attributes: ["nombre", "imagen"]
    });
  } catch (err) {
    throw err;
  }
}

async function detailsCharacterService(id) {
  try {
    return await Personaje.findByPk(id, {include:[{
      model: Pelicula
    } ]})
  } catch (err) {
    throw err;
  }
}

async function updateCharacterService(id, data) {
  try {
    await Personaje.update(data, { where: { id: id } });
    return await this.details(id);
  } catch (err) {
    throw err;
  }
}

async function deleteCharacterService(id) {
  try {
    return await Personaje.destroy({ where: { id: id } });
  } catch (err) {
    throw err;
  }
}

async function restoreCharacterService(id) {
  try {
    console.log(id + "antes");
    const personaje = await Personaje.findOne({
      where: { id: id },
      paranoid: false,
    });
    console.log(id + " despues");
    if (!personaje) {
      throw new Error("No se encontró el Personaje con el ID especificado.");
    }

    if (!personaje.deletedAt) {
      throw new Error("El Personaje no está eliminado.");
    }

    await personaje.restore();

    return personaje;
  } catch (err) {
    throw err;
  }

}

async function searchCharacterService(query) {
  const { nombre, edad, pelicula } = query;

  const filters = {};

  if (nombre) {
      filters.nombre = {
          [Op.like]: '%' + nombre + '%'
      };
  }

  if (edad) {
      filters.edad = edad;
  }

  if (pelicula) {
      return Personaje.findAll({
          where: filters,
          include: {
              model: Pelicula,
              where: { id: pelicula },
              required: true 
          }
      });
  } else {
      return Personaje.findAll({
          where: filters,
          include: Pelicula
      });
  }
}


module.exports = {
  createCharacterService,
  getAllCharacterService,
  detailsCharacterService,
  updateCharacterService,
  deleteCharacterService,
  restoreCharacterService,
  searchCharacterService
};
