import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  EventEmitter
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
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
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent>
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
    if (this.data.mode == "reviews") this.setReviewers();
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
      if (emp.name !== this.data.employee.name)
        this.reviewers.push({ _id: emp._id, name: emp.name, selected: false });
    });

    // Update checkboxes for already assigned reviewers for this current employee in view
    this.data.employee.reviewers.forEach(rev => {
      this.reviewers.forEach(reviewer => {
        if (rev._id == reviewer._id) {
          reviewer.selected = true;
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
      this.updateAdminView.emit(data);
    });
    this.dialogRef.close();
  }

  updateEmployee() {
    this.data.employee.name = this.employee.name;
    this.data.employee.title = this.employee.title;
    this.adminService.updateEmployee(this.data.employee).subscribe(data => {
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
    if (!(this.employee.adminReview && this.employee.adminReview.text)) return;
    this.data.employee.adminReview = this.employee.adminReview;
    this.adminService.updateEmployee(this.data.employee).subscribe(data => {
      console.log("Review saved successfully");
    });
    this.dialogRef.close();
  }

  ngOnDestroy() {}
}
