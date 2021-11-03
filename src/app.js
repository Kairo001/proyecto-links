import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import cors from 'cors'
import routes_index from './routes/index'
import routes_links from './routes/links'
import routes_authentification from './routes/authentication'
import passport from 'passport'
import middlewaresPassport from './middlewares/passport'
import helmet from 'helmet'
import { createLinks, createUsers } from './lib/createTables'

// Inicializaciones
createLinks()
createUsers()
const app = express()

// Configuraciones
app.set('port', process.env.PORT || 3000)
app.set('pkg', pkg)

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(passport.initialize())
passport.use(middlewaresPassport)

// Variables globales
/* app.use((req, res, next) => {
    next()
}) */

// Rutas
app.get('/', (req, res) => {
    res.status(200).json({
        Nombre : app.get('pkg').name,
        Autor : app.get('pkg').author,
        Description : app.get('pkg').description
    })
})
app.use('/api', routes_index)
app.use('/api/links', routes_links)
app.use('/api/authen', routes_authentification)

export default app