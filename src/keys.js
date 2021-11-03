import {config} from 'dotenv'
config()

export const DB =  {
    jwtSecret: process.env.JWT_SECRET || 'yoursecretjwt',
    database: {
        host: process.env.HOST_MYSQL || 'yourhost',
        user: process.env.USER_MYSQL || 'youruserMysql',
        password: process.env.PASSWORD_MYSQL || 'passwordMysql',
        database: process.env.NAME_DATABASE || 'yourdatabase'
    }
}