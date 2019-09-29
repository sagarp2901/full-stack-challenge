const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("helpers/db");
const Listing = db.Listing;

module.exports = {
  getAll
};

async function getAll() {
  return await Listing.find().select("-mls_number");
}
