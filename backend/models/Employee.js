import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Employee = new Schema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  title: {
    type: String
  },
  adminReview: {
    type: Object
  },
  adminRating: {
    type: Number
  },
  feedbacks: {
    type: Array
  },
  reviewers: {
    type: Array
  },
  ratings: {
    type: Array
  },
  employeeRating: {
    type: Number
  },
  employeeReview: {
    type: Object
  }
});

export default mongoose.model("Employee", Employee);
