import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  EventEmitter
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { AdminService } from "../../services/admin.service";
import * as toonAvatar from "cartoon-avatar";

@Component({
  selector: "app-add-employee-dialog",
  templateUrl: "./add-employee-dialog.component.html",
  styleUrls: ["./add-employee-dialog.component.scss"]
})
export class AddEmployeeDialogComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
    public snackBar: MatSnackBar
  ) {}

  reviews;
  reviewers;
  updateAdminView = new EventEmitter();
  pageTitles = {
    edit: "Edit Employee",
    add: "Add an Employee",
    reviewer: "Select Reviewers",
    reviews: "Add Reviews"
  };

  employee = {
    name: "",
    title: "",
    adminReview: { text: "", isEdit: true }
  };

  ngOnInit() {
    if (this.data.mode == "edit") this.setEditData();
    if (this.data.mode == "reviewer") this.setReviewers();
    // if (this.data.mode == "reviews") this.setReviews();
  }

  // Set data during edit mode
  setEditData() {
    this.employee.name = this.data.employee.name;
    this.employee.title = this.data.employee.title;
    this.employee.adminReview = this.data.adminReview;
  }

  setReviews() {
    this.reviews = this.data.employee.reviews;
  }

  setField(field, value) {
    this.employee[field] = value;
  }

  setReviewers() {
    this.reviewers = [];
    // Get all the employee names except the one thats being assigned reviewers to avoid writing self reviews
    this.data.employees.forEach(emp => {
      if (emp._id !== this.data.employee._id)
        this.reviewers.push({
          _id: emp._id,
          name: emp.name,
          selected: false,
          hasReviewed: false
        });
    });

    // Update checkboxes for already assigned reviewers for this current employee in view
    this.data.employee.reviewers.forEach(rev => {
      this.reviewers.forEach(reviewer => {
        if (rev._id == reviewer._id) {
          reviewer.selected = true;
        }
      });
    });

    // Mark reviewer as has reviewed so this reviewer can be disabled from adding a review again.
    this.data.employee.feedbacks.forEach(feedback => {
      this.reviewers.forEach(rev => {
        if (rev._id == feedback.feedbackId) {
          rev.hasReviewed = true;
        }
      });
    });
  }

  createEmployee() {
    // Create a new employee with new name and add it to the list.
    this.data.employee.name = this.employee.name;
    this.data.employee.title = this.employee.title;
    this.data.employee.adminReview = this.employee.adminReview;
    // Generate a random image avatar
    this.data.employee.image = toonAvatar.generate_avatar();
    this.adminService.addEmployee(this.data.employee).subscribe(data => {
      console.log("Added successfully");
      // Show message at the bottom
      this.openSnackBar("Employee Created!");
      this.updateAdminView.emit(data);
    });
    this.dialogRef.close();
  }

  updateEmployee() {
    this.data.employee.name = this.employee.name;
    this.data.employee.title = this.employee.title;
    this.adminService.updateEmployee(this.data.employee).subscribe(data => {
      console.log("Updated successfully");
      // Show message at the bottom
      this.openSnackBar("Employee Updated!");
      this.updateAdminView.emit(data);
    });
    this.dialogRef.close();
  }

  selectReviewer(reviewer) {
    console.log(event);
    reviewer.selected = !reviewer.selected;
  }

  assignReviewers() {
    // Filter out the reviewers that have already reviewed.
    this.data.employee.reviewers = this.reviewers.filter(rev => {
      return rev.selected && !rev.hasReviewed;
    });

    this.adminService.updateEmployee(this.data.employee).subscribe(data => {
      console.log("reviewers Updated successfully");
      // Show message at the bottom
      this.openSnackBar("Reviewers Assigned");
    });
    this.dialogRef.close();
  }

  saveReview() {
    if (!(this.employee.adminReview && this.employee.adminReview.text)) return;
    this.data.employee.adminReview = this.employee.adminReview;
    this.adminService.updateEmployee(this.data.employee).subscribe(data => {
      console.log("Review saved successfully");
      // Show message at the bottom
      this.openSnackBar("Employee review added!");
    });
    this.dialogRef.close();
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, { duration: 1600 });
  }

  ngOnDestroy() {}
}
