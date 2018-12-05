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
  feedbacks: {
    type: Array
  },
  reviewers: {
    type: Array
  },
  ratings: {
    type: Array
  }
});

export default mongoose.model("Employee", Employee);
