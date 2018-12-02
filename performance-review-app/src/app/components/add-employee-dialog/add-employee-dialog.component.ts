import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  EventEmitter
} from "@angular/core";
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
  reviewers;
  currentReview = { text: "", isEdit: false };
  updateAdminView = new EventEmitter();
  titles = {
    edit: "Edit Employee",
    add: "Add an Employee",
    reviewer: "Select Reviewers",
    reviews: "Add Reviews"
  };

  ngOnInit() {
    if (this.data.mode == "edit") this.setUpdateData();
    if (this.data.mode == "reviewer") this.setReviewers();
    if (this.data.mode == "reviews") this.setReviewers();
  }

  setUpdateData() {
    this.employeeName = this.data.employee.name;
  }

  setReviews() {
    this.reviews = this.data.employee.reviews;
  }

  setReviewers() {
    this.reviewers = [];
    // Get all the employee names except the one thats being assigned reviewers to avoid writing self reviews
    this.data.employees.forEach(emp => {
      if (emp.name !== this.data.employee.name)
        this.reviewers.push({ name: emp.name, selected: false });
    });

    // Update checkboxes for already assigned reviewers for this current employee in view
    this.data.employee.reviewers.forEach(rev => {
      this.reviewers.forEach(reviewer => {
        if (rev.name == reviewer.name) {
          reviewer.selected = true;
        }
      });
    });
  }

  updateName(value) {
    this.employeeName = value;
  }

  addEmployee() {
    // Create a new employee with new name and add it to the list.
    let newEmployee = {
      name: this.employeeName,
      // rating: this.rating,
      reviews: []
    };
    this.adminService.addEmployee(newEmployee).subscribe(data => {
      console.log("Added successfully");
      this.updateAdminView.emit(data);
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
      this.updateAdminView.emit(data);
    });
    this.dialogRef.close();
  }

  selectReviewer(reviewer) {
    console.log(event);
    reviewer.selected = !reviewer.selected;
  }

  assignReviewers() {
    this.data.employee.reviewers = this.reviewers.filter(rev => {
      return rev.selected;
    });

    this.adminService.updateEmployee(this.data.employee).subscribe(data => {
      console.log("reviewers Updated successfully");
    });
    this.dialogRef.close();
  }

  saveReview() {
    if (!(this.currentReview && this.currentReview.text)) return;
    this.data.employee.reviews.push(this.currentReview);
    this.currentReview = { text: "", isEdit: false };
    this.adminService.updateEmployee(this.data.employee).subscribe(data => {
      console.log("Review saved successfully");
    });
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.employeeName = "";
  }
}
