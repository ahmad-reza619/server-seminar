// Route.js
const express = require("express")
const router = express.Router();
const utils = require("./utils")

router.get("/products", (req, res) => {
    const products = utils.getProducts()
    return res.json(products);
})

router.get("/carts", (req, res) => {
    const carts = utils.getCarts()
    return res.json(carts);
})

router.post("/carts", (req, res) => {
    utils.addCarts(req.body)
    return res.json({
        success: true,
    });
})

router.patch("/carts", (req, res) => {
    try {
        console.log({ id: req.body.id, qty: req.body.qty })
        utils.changeCartQty({ id: Number.parseInt(req.body.id), qty: req.body.qty })
        return res.json({
            success: true,
        });
    } catch (err) {
        if (err.message == "Carts is empty" || err.message === "ID Not found") {
            return res.json({
                error: err.message,
            })
        }
    }
})

router.delete("/carts/:id", (req, res) => {
    try {
        utils.removeCarts(req.params.id)
        res.json({
            success: true,
        })
    } catch(err) {
        if (err.message == "Carts is empty" || err.message === "ID Not found") {
            return res.json({
                error: err.message,
            })
        }
    }
})

module.exports = router;