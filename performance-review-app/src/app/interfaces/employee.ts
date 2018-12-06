export interface Employee {
  _id: string;
  name: string;
  title: string;
  adminReview: any;
  reviewers: any[];
  feedbacks: any[];
  ratings: any[];
  image: string;
  avgRating: number;
}
