const express = require("express");
const { getProductos } = require("../services/productos.service");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const productos = await getProductos();

        return res.json({
            count: productos.length,
            data: productos,
        });
    } catch (error) {
        console.error("Error obteniendo productos:", error);

        return res.status(500).json({
            message: "Error obteniendo productos",
            error: error.message,
        });
    }
});

module.exports = router;
