const express = require("express");

const router = express.Router();

const { getAllOffices } = require("../../controllers");
const { validateBody } = require("../../middlewars");
const { invoiceJoiSchema } = require("../../model");

router.post("/", validateBody(invoiceJoiSchema), getAllOffices);

module.exports = router;
