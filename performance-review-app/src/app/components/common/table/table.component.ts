import { Component, OnInit, Input } from "@angular/core";
import { CdkColumnDefBase } from "@angular/cdk/table";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit {
  @Input() feedbacks;

  @Input() displayedColumns;
  dataSource = this.feedbacks;

  titles = {
    employeeName: "Employee Name",
    employeeTitle: "Employee Title",
    employeeRating: "Rating",
    feedback: "Review",
    feedBackBy: "Name",
    text: "Review"
  };
  constructor() {}

  ngOnInit() {}
}
