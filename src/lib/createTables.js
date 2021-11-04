import pool from "../database"

export const createTabless = async () => {
    const tabla = await pool.query(`SHOW TABLES LIKE "users"`)
    if(tabla.length==0) {
        await pool.query('CREATE TABLE users(id INT(11) NOT NULL, username VARCHAR(16) NOT NULL, password VARCHAR(60) NOT NULL, fullname VARCHAR(100) NOT NULL)')
        await pool.query('ALTER TABLE users ADD PRIMARY KEY (id);')
        await pool.query('ALTER TABLE users MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2')
    }
    const tabla = await pool.query(`SHOW TABLES LIKE "links"`)
    if(tabla.length==0) {
        await pool.query('CREATE TABLE links (id INT(11) NOT NULL, title VARCHAR(150) NOT NULL, url VARCHAR(255) NOT NULL, description TEXT, user_id INT(11), created_at timestamp NOT NULL DEFAULT current_timestamp, CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id))')
        await pool.query('ALTER TABLE links ADD PRIMARY KEY (id)')
        await pool.query('ALTER TABLE links MODIFY  id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2')
    }
}

