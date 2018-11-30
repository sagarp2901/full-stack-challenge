import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdminService } from "../../services/admin.service";

@Component({
  selector: "app-employee-profile",
  templateUrl: "./employee-profile.component.html",
  styleUrls: ["./employee-profile.component.scss"]
})
export class EmployeeProfileComponent implements OnInit {
  id: number;
  profile: any;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params["id"];
      this.profile = this.adminService.getEmployeeById(this.id);
    });
  }
}
