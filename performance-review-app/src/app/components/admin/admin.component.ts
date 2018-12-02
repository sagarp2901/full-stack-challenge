import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";
import { Employee } from "../../models/employee";
import { MatDialog } from "@angular/material";
import { AddEmployeeDialogComponent } from "src/app/components/add-employee-dialog/add-employee-dialog.component";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  employees: Employee[];
  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit() {
    this.adminService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }

  getUpdatedEmployees(employees) {
    this.employees = employees;
  }

  openDialog(mode, employee?): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      data: { mode, employee, employees: this.employees },
      width: "250px"
    });

    dialogRef.componentInstance.updateAdminView.subscribe(data => {
      this.getUpdatedEmployees(data.employees);
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
