const express = require("express");
const router = express.Router();
const { getCountryDetails } = require("../controllers/countriesController");

router.get("/details", getCountryDetails);

module.exports = router;
