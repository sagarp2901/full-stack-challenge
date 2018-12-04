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
  employeeFeedback = "";

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.adminService.getEmployeeById(this.id).subscribe(data => {
        this.currentEmployee = data;
        this.adminService.getEmployees().subscribe((data: []) => {
          this.employees = data;

          this.employees.forEach((emp: any) => {
            emp.reviewers.forEach((rev: any) => {
              if (rev.name == this.currentEmployee.name) {
                this.writeReviewFor.push(emp);
              }
            });
          });
        });
      });
    });
  }

  submitFeedback(employee, isComplete) {
    employee.feedbacks.push({
      text: this.employeeFeedback,
      isComplete,
      feedbackId: this.currentEmployee._id,
      feedBackBy: this.currentEmployee.name
    });
    this.employeeFeedback = "";

    // Remove the completed employee from the view
    this.writeReviewFor = this.writeReviewFor.filter(emp => {
      return emp._id !== employee._id;
    });

    // Remove the reviewer from this person's database entry
    employee.reviewers = employee.reviewers.filter(rev => {
      return rev._id !== this.currentEmployee._id;
    });

    this.adminService.updateEmployee(employee).subscribe(data => {
      console.log("Feedback Saved successfully");
    });
  }
}
