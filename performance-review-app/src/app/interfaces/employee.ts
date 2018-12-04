export interface Employee {
  _id: string;
  name: string;
  title: string;
  adminReview: any;
  reviewers: any[];
  feedbacks: any[];
  ratings: number[];
  image: string;
  avgRating: number;
}
