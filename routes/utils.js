const fs = require('fs');
const dataPath = './routes/database.json' // path to our JSON file

// util functions
const addCarts = (data) => {
    const existingCarts = getCarts();
    const newCarts = [...existingCarts, { ...data, id: existingCarts.length + 1 }];
    const allData = getAllData();
    allData.carts = newCarts;
    const stringifyData = JSON.stringify(allData)
    fs.writeFileSync(dataPath, stringifyData)
}
const getProductDetail = (id) => {
    const products = getProducts();
    const product = products.findIndex(p => p.id === Number.parseInt(id));
    if (product === -1) {
        throw new Error("no product found with id" + id);
    }
    return products[product]
}
const changeCartQty = ({ id, qty }) => {
    const existingCarts = getCarts();
    if (existingCarts.length === 0) {
        throw new Error("Carts is empty");
    }
    const toRemoveIndex = existingCarts.findIndex(c => c.id === id);
    if (toRemoveIndex === -1) {
        throw new Error("ID Not found");
    }
    existingCarts[toRemoveIndex].quantity = qty;
    const allData = getAllData();
    allData.carts = existingCarts;
    const stringifyData = JSON.stringify(allData)
    fs.writeFileSync(dataPath, stringifyData)
}
const removeCarts = (id) => {
    const existingCarts = getCarts();
    if (existingCarts.length === 0) {
        throw new Error("Carts is empty");
    }
    const toRemoveIndex = existingCarts.findIndex(c => c.id === Number.parseInt(id));
    if (toRemoveIndex === -1) {
        throw new Error("ID Not found");
    }
    existingCarts.splice(toRemoveIndex, 1);
    const allData = getAllData();
    allData.carts = existingCarts;
    const stringifyData = JSON.stringify(allData)
    fs.writeFileSync(dataPath, stringifyData)
}
const getAllData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData);   
};
const getCarts = () => {
    const data = getAllData();
    return data.carts;   
}

const getProducts = () => {
    const data = getAllData();
    return data.products;   
}

module.exports = {
    getProducts,
    getCarts,
    removeCarts,
    addCarts,
    changeCartQty,
    getProductDetail,
}