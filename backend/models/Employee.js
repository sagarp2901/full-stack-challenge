import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Employee = new Schema({
  name: {
    type: String
  },
  rating: {
    type: String
  },
  reviews: {
    type: Array
  },
  reviewers: {
    type: Array
  },
  feedback: {
    type: Object
  }
});

export default mongoose.model("Employee", Employee);
