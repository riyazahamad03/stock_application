const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stock");

router.get("/", stockController.display_all);
router.post("/", stockController.stock_create);
router.delete("/:stock_id", stockController.delete_stock);
router.patch("/:stock_id", stockController.updateStock);

module.exports = router;
