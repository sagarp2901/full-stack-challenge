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
  currentProfile: any;
  employees = [];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.adminService.getEmployeeById(this.id).subscribe(data => {
        this.currentProfile = data;
      });
    });

    this.adminService.getEmployees().subscribe((data: []) => {
      data.forEach((emp: any) => {
        emp.reviewers.forEach(reviewer => {
          if (
            reviewer.name == this.currentProfile.name &&
            // Filtering out employees who's feedback is complete already.
            !emp.feedback.isComplete
          ) {
            this.employees.push(emp);
          }
        });
      });
    });
  }

  submitFeedback(employee, isComplete) {
    employee.feedback.isComplete = isComplete;
    this.adminService.updateEmployee(employee).subscribe(data => {
      console.log("Feedback Saved successfully");
      this.employees = this.employees.filter(emp => {
        return !emp.feedback.isComplete;
      });
    });
  }
}
