import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "src/app/components/home/home.component";
import { AdminViewComponent } from "src/app/components/admin-view/admin-view.component";
import { EmployeeViewComponent } from "src/app/components/employee-view/employee-view.component";
import { EmployeeProfileComponent } from "src/app/components/employee-profile/employee-profile.component";
import { AdminComponent } from "./components/admin/admin.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "admin", component: AdminComponent },
  { path: "employee", component: EmployeeViewComponent },
  { path: "employee-profile/:id", component: EmployeeProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
