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
  ratings: {
    type: Array
  },
  feedbacks: {
    type: Array
  },
  reviewers: {
    type: Array
  },
  reviewings: {
    type: Array
  },
  adminReview: {
    type: Object
  }
});

export default mongoose.model("Employee", Employee);
