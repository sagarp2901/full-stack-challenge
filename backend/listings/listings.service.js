const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("helpers/db");
const Listing = db.Listing;

module.exports = {
  getAll,
  createListing,
  deleteListing
};

async function getAll() {
  return await Listing.find().select("-mls_number");
}

async function createListing(listingParam) {
  const listing = new Listing(listingParam);
  // save listing
  await listing.save();
}

async function deleteListing(id) {
  await Listing.findByIdAndRemove(id);
}
