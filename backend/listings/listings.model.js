const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  mls_number: { type: String, unique: true, required: true },
  coordinates_geohash: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  title: { type: String, required: true },
  home_type: { type: String, required: true },
  offer: { type: String, required: true },
  status: { type: String, required: true },
  unit_name: { type: String, required: true },
  asking_price: { type: Number, required: true }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Listing", schema);
