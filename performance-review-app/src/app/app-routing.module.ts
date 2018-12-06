import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmployeeProfileComponent } from "src/app/components/employee-profile/employee-profile.component";
import { AdminComponent } from "./components/admin/admin.component";

const routes: Routes = [
  { path: "", redirectTo: "/admin", pathMatch: "full" },
  { path: "admin", component: AdminComponent },
  { path: "employee-profile/:id", component: EmployeeProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
