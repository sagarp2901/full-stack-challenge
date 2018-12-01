import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// Material
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule
} from "@angular/material";
import { HomeComponent } from "./components/home/home.component";
import { EmployeeViewComponent } from "./components/employee-view/employee-view.component";
import { AdminViewComponent } from "./components/admin-view/admin-view.component";
import { EmployeeProfileComponent } from "./components/employee-profile/employee-profile.component";
import { AddEmployeeDialogComponent } from "./components/add-employee-dialog/add-employee-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeViewComponent,
    AdminViewComponent,
    EmployeeProfileComponent,
    AddEmployeeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Material
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  entryComponents: [AddEmployeeDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
