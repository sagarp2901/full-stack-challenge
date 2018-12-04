import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// Material
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatListModule,
  MatToolbarModule,
  MatIconModule,
  MatSelectModule
} from "@angular/material";
import { HomeComponent } from "./components/home/home.component";
import { EmployeeViewComponent } from "./components/employee-view/employee-view.component";
import { EmployeeProfileComponent } from "./components/employee-profile/employee-profile.component";
import { AddEmployeeDialogComponent } from "./components/add-employee-dialog/add-employee-dialog.component";
import { AdminComponent } from "./components/admin/admin.component";
import { EmployeeComponent } from "./components/employee/employee.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeViewComponent,
    EmployeeProfileComponent,
    AddEmployeeDialogComponent,
    AdminComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Material
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule
  ],
  entryComponents: [AddEmployeeDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
