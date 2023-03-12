const express = require("express");

const router = express.Router();

const { getAllOffices } = require("../../controllers");

router.post("/", getAllOffices);

module.exports = router;
