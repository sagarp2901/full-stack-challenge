import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../services/admin.service";

@Component({
  selector: "app-admin-view",
  templateUrl: "./admin-view.component.html",
  styleUrls: ["./admin-view.component.scss"]
})
export class AdminViewComponent implements OnInit {
  employees: any[];
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.employees = this.adminService.getEmployees();
  }
}
