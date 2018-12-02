import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Employee } from "src/app/models/employee";
import { AdminService } from "src/app/services/admin.service";
import { MatDialog } from "@angular/material";
import { AddEmployeeDialogComponent } from "src/app/components/add-employee-dialog/add-employee-dialog.component";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"]
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;

  @Output() employeeUpdated = new EventEmitter();

  employees: Employee[];

  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit() {}

  deleteEmployee(employeeId) {
    this.adminService.deleteEmployee(employeeId).subscribe((data: any) => {
      console.log("Deleted successfully");
      this.employeeUpdated.emit(data.employees);
    });
  }

  openDialog(mode, employee): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      data: { mode, employee },
      width: "250px"
    });

    dialogRef.componentInstance.updateAdminView.subscribe(data => {
      this.employeeUpdated.emit(data.employees);
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
