import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../services/admin.service";
import { MatDialog } from "@angular/material";
import { AddEmployeeDialogComponent } from "src/app/components/add-employee-dialog/add-employee-dialog.component";

@Component({
  selector: "app-admin-view",
  templateUrl: "./admin-view.component.html",
  styleUrls: ["./admin-view.component.scss"]
})
export class AdminViewComponent implements OnInit {
  employees: any[];
  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getEmployees();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      data: { mode: "add" },
      width: "250px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.getEmployees();
    });
  }

  openEditDialog(employee): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      data: { mode: "edit", employee },
      width: "250px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.getEmployees();
    });
  }

  getEmployees() {
    this.adminService.getEmployees().subscribe((data: any) => {
      this.employees = data;
    });
  }

  deleteEmployee(employeeId) {
    this.adminService.deleteEmployee(employeeId).subscribe(data => {
      console.log("Deleted successfully");
      this.getEmployees();
    });
  }
}
