import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../services/admin.service";

@Component({
  selector: "app-employee-view",
  templateUrl: "./employee-view.component.html",
  styleUrls: ["./employee-view.component.scss"]
})
export class EmployeeViewComponent implements OnInit {
  employees;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getEmployees().subscribe(data => (this.employees = data));
  }
}
