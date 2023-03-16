const express = require("express");

const router = express.Router();

const { getAllOffices } = require("../../controllers");
const { validateBody } = require("../../middlewars");
const { findOfficeSchema } = require("../../model");

router.post("/", validateBody(findOfficeSchema), getAllOffices);

module.exports = router;
