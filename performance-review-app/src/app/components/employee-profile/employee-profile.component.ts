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
  writeReviewFor = [];

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

          // Creating a list of employees that require review from this current employee
          this.employees.forEach((emp: any) => {
            emp.reviewers.forEach((rev: any) => {
              if (rev.name == this.currentEmployee.name) {
                emp.employeeReview = { text: "", isSaved: false };
                emp.employeeRating = "";
                this.writeReviewFor.push(emp);
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

  submitFeedback(employee, isComplete) {
    // Find if feedback by this current employee exists.
    let foundIndex = employee.feedbacks.findIndex(feedback => {
      return feedback.feedbackId == this.currentEmployee._id;
    });

    // If feedback does not exist or if the feedbacks array is empty then add feedback
    if (foundIndex == -1) {
      employee.feedbacks.push({
        text: employee.employeeReview.text,
        isComplete,
        feedbackId: this.currentEmployee._id,
        feedBackBy: this.currentEmployee.name
      });
    } else {
      // Update the feedback if feedback by this current employee does not exist.
      employee.feedbacks[foundIndex].text = employee.employeeReview.text;
    }

    if (isComplete) {
      // Remove the employee with completed review from the view
      this.writeReviewFor = this.writeReviewFor.filter(emp => {
        return emp._id !== employee._id;
      });

      // Remove the reviewer from this person's database entry whose review is complete
      employee.reviewers = employee.reviewers.filter(rev => {
        return rev._id !== this.currentEmployee._id;
      });
    }

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
