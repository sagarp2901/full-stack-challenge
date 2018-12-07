import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdminService } from "../../services/admin.service";

@Component({
  selector: "app-employee-profile",
  templateUrl: "./employee-profile.component.html",
  styleUrls: ["./employee-profile.component.scss"]
})
export class EmployeeProfileComponent implements OnInit {
  id: string;
  currentEmployee: any;
  employees = [];
  writeReviewFor;

  reviewsByYou;

  availableRatings = [1, 2, 3, 4, 5];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      // Get current logged in employee
      this.adminService.getEmployeeById(this.id).subscribe(data => {
        this.currentEmployee = data;
        // Get list of all the employees to find out which employee needs feedback from the current employee
        this.adminService.getEmployees().subscribe((data: []) => {
          this.employees = data;

          this.writeReviewFor = [];
          // Creating a list of employees that require review from this current employee
          this.employees.forEach((emp: any) => {
            emp.reviewers.forEach((rev: any) => {
              if (rev._id == this.currentEmployee._id) {
                this.writeReviewFor.push(emp);
              }
            });
          });

          // Adding an empty review field.
          this.writeReviewFor.forEach(colleague => {
            colleague.employeeReview = {
              text: "",
              isEdit: true,
              isComplete: false
            };
            colleague.employeeRating = "";
          });

          // Reviews given by Han
          this.reviewsByYou = [];
          this.employees.forEach(emp => {
            emp.feedbacks.forEach(feedback => {
              if (feedback.feedbackId == this.currentEmployee._id) {
                this.reviewsByYou.push({
                  employeeName: emp.name,
                  employeeTitle: emp.title,
                  employeeRating: emp.employeeRating,
                  feedback: feedback.text
                });
              }
            });
          });
        });
      });
    });
  }

  updateRatingByEmployee(event, employee) {
    // Set an individual rating given by this employee
    employee.employeeRating = event.value;

    let foundIndex = employee.ratings.findIndex(rating => {
      return rating.ratingId == this.currentEmployee._id;
    });

    if (foundIndex == -1) {
      employee.ratings.push({
        rating: event.value,
        ratingId: this.currentEmployee._id
      });
    } else {
      employee.ratings[foundIndex].rating = event.value;
    }
  }

  submitFeedback(employee) {
    // Push the new feedback to the feedbacks
    employee.feedbacks.push({
      text: employee.employeeReview.text,
      feedbackId: this.currentEmployee._id,
      feedBackBy: this.currentEmployee.name
    });

    // Remove the employee with completed review from the view
    this.writeReviewFor = this.writeReviewFor.filter(emp => {
      return emp._id !== employee._id;
    });

    // Remove the reviewer from this person's database entry whose review is complete
    employee.reviewers = employee.reviewers.filter(rev => {
      return rev._id !== this.currentEmployee._id;
    });

    this.adminService.updateEmployee(employee).subscribe(data => {
      console.log("Feedback Saved successfully");
    });
  }

  avgRating(ratings: []) {
    let sum = 0;
    ratings.forEach((element: any) => {
      sum = sum + element.rating;
    });
    return Math.floor(sum / ratings.length);
  }
}
