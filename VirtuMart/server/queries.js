
const getAllProducts = async (request, response) => {
    const [rows, fields] = await connection.query('SELECT * FROM products');
    res.json(rows);
}



export {
    getAllProducts
}