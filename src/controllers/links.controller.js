import pool from '../database'

export const getLinks = async (req, res) => {
    try {
        const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id])
        res.status(200).json({ links })
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error al consultar los links' })
    }
}

export const createLink = async (req, res) => {
    try {
        const { title, url, description } = req.body
        const newLink = {
            title,
            url,
            description,
            user_id: req.user.id
        }
        if (!title) {
            return res.status(400).json({
                message: 'Es necesario que se escriba el título.'
            })
        }
        if (!url) {
            return res.status(400).json({
                message: 'Es necesario que se escriba la URL.'
            })
        }

        await pool.query('INSERT INTO links set ?', [newLink])
        res.status(201).json({ message: 'El link ha sido guardado correctamente.' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Ha ocurrido un error al guardar el link.' })
    }
}

export const deleteLink = async (req, res) => {
    try {
        const { id } = req.params
        const linkDeleted = await pool.query('DELETE FROM links WHERE ID = ? AND user_id = ?', [id, req.user.id])
        if (linkDeleted.affectedRows == 1) {
            return res.json({
                message: 'Link eliminado correctamente.'
            })
        }
        return res.status(400).json({
            message: `El link con id ${id} no existe.`
            })

    } catch (error) {
        res.status(500).json({
            message: 'Ha ocurrido un error al eliminar el link.'
        })
    }
}

export const getLink = async (req, res) => {
    try {
        const { id } = req.params
        const link = await pool.query('SELECT * FROM links WHERE ID = ? AND user_id = ?', [id, req.user.id])
        if(link[0]) {
           return  res.json({link : link[0]})
        }
        return res.status(400).json({message: `Link no válido para el usuario.`})
        
    } catch (error) {
        res.status(500).json({message: 'Ha ocurrido un error al consultar una nota.'})
    }
    
}

export const updateLink = async (req, res) => {
    try {
        const { id } = req.params
        const { title, url, description } = req.body
        if(!title) {
            return res.status(400).json({
                message: 'Es necesario que se escriba el título.'
            })
        }
        if(!url) {
            return res.status(400).json({
                message: 'Es necesario que se escriba la url.'
            })
        }
        const newLink = {
            title,
            url,
            description
        }
        console.log(req.connection.remoteAddress) 
        pool.query('UPDATE links SET ? WHERE ID = ? AND user_id = ?', [newLink, id, req.user.id])
        res.json({
            message: 'Link actualizado correctamente.'
        })
    } catch (error) {
        res.json({message: 'Ha ocurrido un error al actualizar el link.'})
    }
}