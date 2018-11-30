import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../services/admin.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
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
    this.employees = this.adminService.getEmployees();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: "250px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
