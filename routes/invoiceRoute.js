const express = require("express");
const router = express.Router();
const invoiceListController = require("../controllers/invoiceListController");

router.post("/createInvoice", invoiceListController.createInvoice);
router.route("/").get(invoiceListController.getAllPosts);

module.exports = router;
