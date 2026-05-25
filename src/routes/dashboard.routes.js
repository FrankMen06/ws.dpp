const express = require("express");

const {
    getDashboardCharts,
    getPedidosPorMes,
    getProductosMasVendidos,
} = require("../services/dashboard.service");

const router = express.Router();

router.get("/charts", async (req, res) => {
    try {
        const charts = await getDashboardCharts();

        return res.json(charts);
    } catch (error) {
        console.error("Error obteniendo datos para gráficos:", error);

        return res.status(500).json({
            message: "Error obteniendo datos para gráficos",
            error: error.message,
        });
    }
});

router.get("/charts/pedidos-por-mes", async (req, res) => {
    try {
        const data = await getPedidosPorMes();

        return res.json({
            count: data.length,
            data,
        });
    } catch (error) {
        console.error("Error obteniendo pedidos por mes:", error);

        return res.status(500).json({
            message: "Error obteniendo pedidos por mes",
            error: error.message,
        });
    }
});

router.get("/charts/productos-mas-vendidos", async (req, res) => {
    try {
        const data = await getProductosMasVendidos();

        return res.json({
            count: data.length,
            data,
        });
    } catch (error) {
        console.error("Error obteniendo productos más vendidos:", error);

        return res.status(500).json({
            message: "Error obteniendo productos más vendidos",
            error: error.message,
        });
    }
});

module.exports = router;
