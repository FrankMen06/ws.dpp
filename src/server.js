require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { testConnection } = require("./config/database.service");
const dashboardRoutes = require("./routes/dashboard.routes");
const pedidosRoutes = require("./routes/pedidos.routes");
const productosRoutes = require("./routes/productos.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "API corriendo correctamente",
    });
});

app.get("/health/database", async (req, res) => {
    try {
        const result = await testConnection();

        return res.json({
            message: "PostgreSQL conectado correctamente",
            databaseTime: result.now,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Error conectando con PostgreSQL",
            error: error.message,
        });
    }
});

app.use("/dashboard", dashboardRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/productos", productosRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`API escuchando en puerto ${port}`);
});
