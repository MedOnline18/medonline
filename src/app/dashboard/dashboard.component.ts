import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { UsersDetails } from '../users/users.interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public visits = [];
  public user: UsersDetails;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.onGetVisits();
  }

  onCancel(id: number) {
    this.dashboardService.deleteVisit(id).subscribe(() => this.onGetVisits());
  }

  onGetVisits() {
    this.dashboardService.getVisits().subscribe((res: any[]) => {
      if (this.user.user_role === '1') {
        this.visits = res.filter(val => this.user.id === val.doctor_id);
      } else if (this.user.user_role === '2') {
        this.visits = res.filter(val => this.user.id === val.user_id);
      }
    });
  }

}
