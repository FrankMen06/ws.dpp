const { pool } = require("../config/database.service");

function extractValue(content, label) {
    const regex = new RegExp(`${label}:\\s*(.*)`, "i");
    const match = content.match(regex);

    return match ? match[1].trim() : null;
}

function parseProducto(row) {
    const content = row.content || "";

    const idTexto = extractValue(content, "ID");
    const producto = extractValue(content, "Producto");
    const categoria = extractValue(content, "Categoría");
    const ingredientes = extractValue(content, "Ingredientes");
    const origen = extractValue(content, "Origen");
    const precioTexto = extractValue(content, "Precio");
    const palabrasClave = extractValue(content, "Palabras clave");

    const precio = precioTexto
        ? Number(precioTexto.replace("$", "").trim())
        : null;

    return {
        id: idTexto || row.id,
        documento_id: row.id,
        producto,
        categoria,
        ingredientes,
        origen,
        precio,
        palabras_clave: palabrasClave,
    };
}

async function getProductos() {
    const result = await pool.query(`
        SELECT 
            id,
            content,
            metadata
        FROM documentos_vectores
        ORDER BY id;
    `);

    return result.rows
        .map(parseProducto)
        .filter((producto) => producto.producto);
}

module.exports = {
    getProductos,
};
