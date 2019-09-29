const express = require("express");
const router = express.Router();
const listingService = require("./listings.service");

//routes
router.get("/", getAll);

module.exports = router;

function getAll(req, res, next) {
  listingService
    .getAll()
    .then(listings => res.json(listings))
    .catch(err => next(err));
}
