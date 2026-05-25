const { pool } = require("../config/database.service");

async function getPedidosPorMes() {
    const result = await pool.query(`
        SELECT
            TO_CHAR(fecha_pedido, 'YYYY-MM') AS mes,
            COUNT(*)::int AS total_pedidos,
            COALESCE(SUM(total), 0)::numeric(10, 2) AS total_ventas
        FROM pedidos
        GROUP BY TO_CHAR(fecha_pedido, 'YYYY-MM')
        ORDER BY mes;
    `);

    return result.rows;
}

async function getProductosMasVendidos() {
    const result = await pool.query(`
        SELECT
            producto,
            SUM(cantidad)::int AS total_unidades,
            COUNT(*)::int AS total_pedidos,
            COALESCE(SUM(total), 0)::numeric(10, 2) AS total_ventas
        FROM pedidos
        GROUP BY producto
        ORDER BY total_unidades DESC
            LIMIT 10;
    `);

    return result.rows;
}

async function getDashboardCharts() {
    const [
        pedidosPorMes,
        productosMasVendidos,
    ] = await Promise.all([
        getPedidosPorMes(),
        getProductosMasVendidos(),
    ]);

    return {
        pedidosPorMes,
        productosMasVendidos,
    };
}

module.exports = {
    getPedidosPorMes,
    getProductosMasVendidos,
    getDashboardCharts,
};
