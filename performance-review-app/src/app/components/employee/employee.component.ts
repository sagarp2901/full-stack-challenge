import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Employee } from "src/app/interfaces/employee";
import { AdminService } from "src/app/services/admin.service";
import { MatDialog, MatSnackBar } from "@angular/material";
import { AddEmployeeDialogComponent } from "src/app/components/add-employee-dialog/add-employee-dialog.component";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"]
})
export class EmployeeComponent implements OnInit {
  colors = [
    "#FF6969",
    "#69FF69",
    "#6969FF",
    "#FFFF5D",
    "#69FFFF",
    "#FF69FF",
    "#FFAFAF",
    "#AFFFAF",
    "#AFAFFF",
    "#FFFFAF",
    "#AFFFFF",
    "#FFAFFF",
    "#E4D5B5",
    "#819EC1"
  ];

  @Input() colorIndex = 0;
  @Input() employee: Employee;

  @Output() employeeUpdated = new EventEmitter();

  @Input() employees: Employee[];

  availableRatings = [1, 2, 3, 4, 5];

  // Just creating a unique ID for this admin so that it can be used to identify admin rating
  adminId = "fe7wr6y32898t2";

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  renderColor() {
    return this.colors[this.colorIndex]
      ? this.colors[this.colorIndex]
      : this.colors[this.colorIndex % 2];
  }

  updateReview(employee) {
    employee.adminReview.isEdit = false;
    this.adminService.updateEmployee(employee).subscribe(data => {
      console.log("Review saved successfully");
    });
  }

  updateRatingByAdmin(event, employee) {
    // Set an individual rating given by the admin
    employee.adminRating = event.value;

    let foundIndex = employee.ratings.findIndex(rating => {
      return rating.ratingId == this.adminId;
    });

    if (foundIndex == -1) {
      employee.ratings.push({
        rating: event.value,
        ratingId: this.adminId
      });
    } else {
      employee.ratings[foundIndex].rating = event.value;
    }
  }

  deleteEmployee(employeeId) {
    this.adminService.deleteEmployee(employeeId).subscribe((data: any) => {
      console.log("Deleted successfully");
      this.openSnackBar("Employee Deleted !");
      this.employeeUpdated.emit(data.employees);
    });
  }

  openDialog(mode, employee): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      data: { mode, employee, employees: this.employees },
      width: mode == "edit" ? "250px" : "",
      minWidth: mode == "edit" ? "250px" : "350px",
      maxWidth: "500px",
      maxHeight: "400px"
    });

    dialogRef.componentInstance.updateAdminView.subscribe(data => {
      this.employeeUpdated.emit(data.employees);
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

  avgRating(ratings: []) {
    let sum = 0;
    ratings.forEach((element: any) => {
      sum = sum + element.rating;
    });
    return Math.floor(sum / ratings.length);
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, { duration: 1600 });
  }
}
