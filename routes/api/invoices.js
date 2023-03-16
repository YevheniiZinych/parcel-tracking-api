const express = require("express");

const router = express.Router();

const { getInvoiceNumber } = require("../../controllers");

router.post("/", getInvoiceNumber);

module.exports = router;
