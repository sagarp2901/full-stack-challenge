import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AdminService } from "../../services/admin.service";

@Component({
  selector: "app-add-employee-dialog",
  templateUrl: "./add-employee-dialog.component.html",
  styleUrls: ["./add-employee-dialog.component.scss"]
})
export class AddEmployeeDialogComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent>
  ) {}

  employeeName;
  rating;
  reviews;
  ngOnInit() {
    if (this.data.mode == "edit") this.setUpdateData();
  }

  setUpdateData() {
    this.employeeName = this.data.employee.name;
    this.rating = this.data.employee.rating;
    this.reviews = this.data.employee.reviews;
  }

  updateName(value) {
    this.employeeName = value;
  }

  addEmployee() {
    // Create a new employee with new name and add it to the list.
    let newEmployee = {
      name: this.employeeName,
      rating: this.rating,
      reviews: []
    };
    this.adminService.addEmployee(newEmployee).subscribe(data => {
      console.log("Added successfully");
    });
    this.dialogRef.close();
  }

  updateEmployee() {
    let updatedEmployee = {
      _id: this.data.employee._id,
      name: this.employeeName,
      rating: this.rating,
      reviews: []
    };
    this.adminService.updateEmployee(updatedEmployee).subscribe(data => {
      console.log("Updated successfully");
    });
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.employeeName = "";
  }
}
