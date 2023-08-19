const { createCharacterService, getAllCharacterService, detailsCharacterService, updateCharacterService, deleteCharacterService, restoreCharacterService, searchCharacterService } = require('../service/personajeService.js');

async function createCharacterController(req, res) {
    try {
        const personaje = await createCharacterService(req.body)
        return res.status(201).json(personaje)
    }
    catch (err) {
        return res.status(400).json({ err: err.message })
    }
};

function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

async function getAllCharacterController(req, res) {
    try {
        console.log(Boolean(req.query))
        if(!isEmpty(req.query)) {
            const busqueda = await searchCharacterService(req.query)
            return res.status(200).json(busqueda);
        }
        const personajes = await getAllCharacterService();
        return res.status(200).json(personajes);
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

async function detailsCharacterController(req, res) {
    try {
        const personaje = await detailsCharacterService(req.params.id);
        if (personaje) {
            return res.status(200).json(personaje);
        } else {
            return res.status(404).json({ message: 'Personaje no encontrado' });
        }
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

async function updateCharacterController(req, res) {
    try {
        const personaje = await updateCharacterService(req.params.id, req.body);
        return res.status(200).json(personaje);
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }
}

async function deleteCharacterController(req, res) {
    try {
        await deleteCharacterService(req.params.id);
        return res.status(204).send();
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

async function restoreCharacterController(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'El ID del personaje es requerido.' });
    }

    try {
        const restore = await restoreCharacterService(id);

        return res.status(200).json(restore);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


module.exports = { createCharacterController, getAllCharacterController, detailsCharacterController, updateCharacterController, deleteCharacterController, restoreCharacterController }