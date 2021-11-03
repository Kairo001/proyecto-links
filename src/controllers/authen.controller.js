import pool from '../database'
import jwt from 'jsonwebtoken'
import {DB} from '../keys'
import helpers from '../lib/helpers'

const createToken = user => {
    return jwt.sign({id: user.id, username: user.username}, DB.jwtSecret, {
        expiresIn: 86400
    })
}

export const signup = async (req, res) => {
    try {
        const {username, password, fullname, confirm_password} = req.body
        if(!username || !password || !fullname || !confirm_password) {
            return res.status(400).json({
                message: 'Por favor ingresa todos los campos.'
            })
        }
        const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username])
        if(rows.length > 0){
            return res.status(400).json({
                message: 'El nombre de usuario ya existe.'
            })
        }
        if(password.length < 5) {
            return res.status(400).json({
                message: 'Ingresa una contraseña con más de 4 caracteres.'
            })
        }
        if(password!=confirm_password) {
            return res.status(400).json({
                message: 'Las contraseñas no coinciden.'
            })
        }
        const newUser = {
            username,
            password,
            fullname
        }
        newUser.password = await helpers.encryprPassword(password)
        const result = await pool.query('INSERT INTO users set ?', [newUser])
        newUser.id = result.insertId
        return res.status(201).json({
            message: 'El usuario ha sido creado correctamente.',
            token: createToken(newUser)
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Ha ocurrido un error al crear el usuario.'
        })
    } 
}

export const signin = async (req, res) => {
    try {
        const {username, password} = req.body
        if(!username || !password) {
            return res.status(400).json({
                message: 'Por favor ingresa todos los campos.'
            })
        }
        const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username])
        if(rows.length == 0) {
            return res.status(400).json({
                message: 'El usuario no existe.'
            })
        }
        const user = rows[0]
        const validatorPassword = await helpers.matchPassword(password, user.password)
        if(validatorPassword) {
            return res.status(200).json({
                token: createToken(user)
            })
        } 
        return res.status(400).json({
            message: 'Contraseña errónea.'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Ha ocurrido un error al intentar iniciar sesión.'
        })
    } 
}