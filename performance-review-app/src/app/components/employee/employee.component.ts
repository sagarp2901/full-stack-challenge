import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Employee } from "src/app/interfaces/employee";
import { AdminService } from "src/app/services/admin.service";
import { MatDialog } from "@angular/material";
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
    "#CDB075",
    "#FFAFAF",
    "#AFFFAF",
    "#AFAFFF",
    "#FFFFAF",
    "#AFFFFF",
    "#FFAFFF",
    "#E4D5B5",
    "#A4B086",
    "#819EC1"
  ];

  @Input() colorIndex = 0;
  @Input() employee: Employee;

  @Output() employeeUpdated = new EventEmitter();

  @Input() employees: Employee[];

  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit() {}

  renderColor() {
    return this.colors[this.colorIndex]
      ? this.colors[this.colorIndex]
      : this.colors[this.colorIndex % 2];
  }

  updateReview(review, employee) {
    review.isEdit = false;
    this.adminService.updateEmployee(employee).subscribe(data => {
      console.log("Review saved successfully");
    });
  }

  deleteEmployee(employeeId) {
    this.adminService.deleteEmployee(employeeId).subscribe((data: any) => {
      console.log("Deleted successfully");
      this.employeeUpdated.emit(data.employees);
    });
  }

  openDialog(mode, employee): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      data: { mode, employee, employees: this.employees },
      width: "350px",
      maxHeight: "400px"
    });

    dialogRef.componentInstance.updateAdminView.subscribe(data => {
      this.employeeUpdated.emit(data.employees);
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
