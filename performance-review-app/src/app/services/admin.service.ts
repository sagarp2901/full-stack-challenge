import { Injectable } from "@angular/core";
import { ArrayType } from "@angular/compiler/src/output/output_ast";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  employees: any[];

  constructor() {
    this.employees = [
      { id: 0, name: "Luke", reviews: ["good", "jedi", "ametuer"], rating: 5 },
      { id: 1, name: "Yoda", reviews: ["master", "very powerful"], rating: 5 },
      {
        id: 2,
        name: "Jaba",
        reviews: ["hut king", "his code speaks better than his words"],
        rating: 5
      },
      { id: 3, name: "Duku", reviews: ["cunning", "sharp"], rating: 5 },
      {
        id: 4,
        name: "Vader",
        reviews: ["great guy", "intimidates with his code"],
        rating: 5
      }
    ];
  }

  getEmployees() {
    return this.employees;
  }

  getEmployeeById(id) {
    return this.employees.find(employee => {
      return employee.id == id;
    });
  }

  addEmployee(employee) {
    this.employees.push(employee);
  }
}
