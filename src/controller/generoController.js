const { createGenreService, getAllGenreService, detailsGenreService, updateGenreService, deleteGenreService } = require('../service/generoService.js');


async function createGenreController(req, res) {
    try {
        const genero = await createGenreService(req.body)
        return res.status(201).json(genero)
    }
    catch (err) {
        return res.status(400).json({ err: err.message })
    }
};

async function getAllGenreController(req, res) {
    try {
        const genero = await getAllGenreService();
        return res.status(200).json(genero);
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

async function detailsGenreController(req, res) {
    try {
        const genero = await detailsGenreService(req.params.id);
        if (genero) {
            return res.status(200).json(genero);
        } else {
            return res.status(404).json({ message: 'Personaje no encontrado' });
        }
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

async function updateGenreController(req, res) {
    try {
        const genero = await updateGenreService(req.params.id, req.body);
        return res.status(200).json(genero);
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }
}

async function deleteGenreController(req, res) {
    try {
        await deleteGenreService(req.params.id);
        return res.status(204).send();
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

module.exports = {createGenreController, getAllGenreController, detailsGenreController, updateGenreController, deleteGenreController}