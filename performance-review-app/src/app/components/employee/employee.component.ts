import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Employee } from "src/app/models/employee";
import { AdminService } from "src/app/services/admin.service";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"]
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;

  @Output() employeeDeleted = new EventEmitter();

  constructor(private adminService: AdminService) {}

  ngOnInit() {}

  deleteEmployee(employeeId) {
    this.adminService.deleteEmployee(employeeId).subscribe((data: any) => {
      console.log("Deleted successfully");
      this.employeeDeleted.emit(data.employees);
    });
  }
}
