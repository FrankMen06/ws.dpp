const { Pool } = require("pg");

const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_SSL,
} = process.env;

if (!DB_HOST || !DB_PORT || !DB_NAME || !DB_USER || !DB_PASSWORD) {
    throw new Error(
        "Faltan variables de entorno de PostgreSQL. Revisa DB_HOST, DB_PORT, DB_NAME, DB_USER y DB_PASSWORD."
    );
}

const pool = new Pool({
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    ssl: DB_SSL === "true"
        ? {
            rejectUnauthorized: false,
        }
        : false,
});

async function testConnection() {
    const result = await pool.query("SELECT NOW() AS now");
    return result.rows[0];
}

module.exports = {
    pool,
    testConnection,
};
