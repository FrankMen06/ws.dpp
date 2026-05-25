const express = require("express");
const { getAllPedidos } = require("../services/pedidos.service");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const pedidos = await getAllPedidos();

        return res.json({
            count: pedidos.length,
            data: pedidos,
        });
    } catch (error) {
        console.error("Error obteniendo pedidos:", error);

        return res.status(500).json({
            message: "Error obteniendo pedidos",
            error: error.message,
        });
    }
});

module.exports = router;
