import mysql from 'mysql2'
import { promisify } from 'util'
import { DB } from './keys'

// Método usado para crear "hilos" y cada uno irá haciendo una tarea a la vez en secuencia
const pool = mysql.createPool(DB.database)

pool.getConnection((error, connection) => {
    if(error) {
        if(error.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection closed')
        }
        if(error.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has to many connections')
        }
        if(error.code === 'ECONNREFUSED'){
            console.error('Database connection was refused')
        }
    }

    if (connection) connection.release()
    console.log(`Connected to the database ${DB.database.database}`)
    return
})

// El módulo pool no soporta async await, solo callbacks, por lo tanto se usa promisify el cual permite
// usar los métodos de este objeto con async await o promesas
pool.query = promisify(pool.query)

export default pool