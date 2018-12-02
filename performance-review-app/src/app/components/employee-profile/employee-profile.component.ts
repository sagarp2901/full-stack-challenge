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
  profile: any;
  employees = [];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.adminService.getEmployeeById(this.id).subscribe(data => {
        this.profile = data;
      });
    });

    this.adminService.getEmployees().subscribe((data: []) => {
      data.forEach((emp: any) => {
        emp.reviewers.forEach(reviewer => {
          if (reviewer.name == this.profile.name) {
            this.employees.push(emp.name);
          }
        });
      });
    });
  }
}
