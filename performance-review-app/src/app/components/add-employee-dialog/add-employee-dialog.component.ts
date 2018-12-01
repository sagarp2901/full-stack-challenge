import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { AdminService } from "../../services/admin.service";

@Component({
  selector: "app-add-employee-dialog",
  templateUrl: "./add-employee-dialog.component.html",
  styleUrls: ["./add-employee-dialog.component.scss"]
})
export class AddEmployeeDialogComponent implements OnInit, OnDestroy {
  constructor(
    private adminService: AdminService,
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent>
  ) {}

  employeeName;
  ngOnInit() {}

  updateName(value) {
    this.employeeName = value;
  }

  addEmployee() {
    // Create a new employee with new name and add it to the list.
    let newEmployee = {
      id: this.adminService.getEmployees().length + 1,
      name: this.employeeName,
      rating: 0,
      reviews: []
    };
    this.adminService.addEmployee(newEmployee);
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.employeeName = "";
  }
}
