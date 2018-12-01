import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  baseUrl = "http://localhost:4000/employees";
  /*employees = [
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
  ];*/

  constructor(private http: HttpClient) {}

  getEmployees() {
    let url = `${this.baseUrl}`;
    return this.http.get(url);
  }

  getEmployeeById(id) {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get(url);
  }

  addEmployee(employee) {
    let url = `${this.baseUrl}/add`;
    return this.http.post(url, employee);
  }

  updateEmployee(employee) {
    let url = `${this.baseUrl}/update/${employee._id}`;
    return this.http.post(url, employee);
  }

  deleteEmployee(id) {
    let url = `${this.baseUrl}/delete/${id}`;
    return this.http.get(url);
  }
}
