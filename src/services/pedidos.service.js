const { pool } = require("../config/database.service");

async function getAllPedidos() {
    const result = await pool.query(`
        SELECT 
            id,
            nombre_cliente,
            apellido_cliente,
            telefono_cliente,
            producto,
            cantidad,
            total,
            direccion,
            fecha_pedido,
            hora_pedido,
            fecha_registro,
            estado
        FROM pedidos
        ORDER BY fecha_registro DESC, id DESC;
    `);

    return result.rows;
}

module.exports = {
    getAllPedidos,
};
