import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-add-employee-dialog",
  templateUrl: "./add-employee-dialog.component.html",
  styleUrls: ["./add-employee-dialog.component.scss"]
})
export class AddEmployeeDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddEmployeeDialogComponent>) {}

  ngOnInit() {}
}
