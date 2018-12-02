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
  currentReview = { text: "", isEdit: false };
  isReviewEditable = false;
  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getEmployees();
  }

  saveReview(employee) {
    if (!this.currentReview) return;
    employee.reviews.push(this.currentReview);
    this.currentReview = { text: "", isEdit: false };
    this.adminService.updateEmployee(employee).subscribe(data => {
      console.log("Review saved successfully");
    });
  }

  updateReview(review, employee) {
    review.isEdit = false;
    this.adminService.updateEmployee(employee).subscribe(data => {
      console.log("Review saved successfully");
    });
  }

  deleteReview(review, employee) {
    employee.reviews = employee.reviews.filter(rev => {
      return review.text !== rev.text;
    });
    this.adminService.updateEmployee(employee).subscribe(data => {
      console.log("Review Deleted successfully");
    });
  }

  toggleReviewEdit(review) {
    review.isEdit = true;
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      data: { mode: "add" },
      width: "250px"
    });

    dialogRef.componentInstance.updateAdminView.subscribe(() => {
      this.getEmployees();
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      // this.getEmployees();
    });
  }

  openEditDialog(employee): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      data: { mode: "edit", employee },
      width: "250px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      // this.getEmployees();
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
