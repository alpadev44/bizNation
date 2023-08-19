const { createMoviesService, getAllMoviesService, detailsMoviesService, updateMoviesService, deleteMoviesService, restoreMovieService, searchMoviesService } = require('../service/peliculaService.js');

async function createMovieController(req, res) {
    try {
        const pelicula = await createMoviesService(req.body)
        return res.status(201).json(pelicula)
    }
    catch (err) {
        return res.status(400).json({ err: err.message })
    }
};

function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

async function getAllMovieController(req, res) {
    try {
        console.log(Boolean(req.query))
        if(!isEmpty(req.query)) {
            console.log(req.query)
            const busqueda = await searchMoviesService(req.query)
            return res.status(200).json(busqueda);
        }
        const pelicula = await getAllMoviesService();
        return res.status(200).json(pelicula);
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

async function detailsMovieController(req, res) {
    try {
        const pelicula = await detailsMoviesService(req.params.id);
        if (pelicula) {
            return res.status(200).json(pelicula);
        } else {
            return res.status(404).json({ message: 'Personaje no encontrado' });
        }
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

async function updateMovieController(req, res) {
    try {
        const pelicula = await updateMoviesService(req.params.id, req.body);
        return res.status(200).json(pelicula);
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }
}

async function deleteMovieController(req, res) {
    try {
        await deleteMoviesService(req.params.id);
        return res.status(204).send();
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}


async function restoreMovieController(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'El ID de la pelicula es requerido.' });
    }

    try {
        const restore = await restoreMovieService(id);

        return res.status(200).json(restore);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { createMovieController, getAllMovieController, detailsMovieController, updateMovieController, deleteMovieController, restoreMovieController }