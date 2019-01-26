import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { AppointmentComponent } from './users/appointment/appointment.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit/:user_id', component: RegisterComponent },
  { path: 'users/:user_role', component: UsersListComponent },
  { path: 'visit', component: AppointmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
