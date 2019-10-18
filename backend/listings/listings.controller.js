const express = require("express");
const router = express.Router();
const listingService = require("./listings.service");

//routes
router.get("/", getAll);
router.get("/addListing", addListing);
router.get("/deleteListing", deleteListing);

module.exports = router;

function getAll(req, res, next) {
  listingService
    .getAll()
    .then(listings => res.json(listings))
    .catch(err => next(err));
}

function addListing(req, res, next) {
  listingService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function deleteListing(req, res, next) {
  listingService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
