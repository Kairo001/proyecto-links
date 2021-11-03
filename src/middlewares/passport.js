import {ExtractJwt, Strategy} from 'passport-jwt'
import {DB} from '../keys'
import pool from '../database'

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: DB.jwtSecret
}

export default new Strategy(opts, async(payload, done) => {
    try {
        const rows = await pool.query('SELECT * FROM users WHERE ID = ?', [payload.id])
        if(rows.length > 0) {
            const user = rows[0]
            return done(null, user)
        }
        return done(null, false)
    } catch (err) {
        console.log(err)
        return done(err, false)
    }
})
