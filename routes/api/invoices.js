const express = require("express");

const router = express.Router();

const { getInvoiceNumber } = require("../../controllers");
const { validateBody } = require("../../middlewars");
const { invoiceJoiSchema } = require("../../model");

router.post("/", validateBody(invoiceJoiSchema), getInvoiceNumber);

module.exports = router;
