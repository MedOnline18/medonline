import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public visits = [];

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.onGetVisits();
  }

  onCancel(id: number) {
    this.dashboardService.deleteVisit(id).subscribe(() => this.onGetVisits());
  }

  onGetVisits() {
    this.dashboardService.getVisits().subscribe(res => this.visits = res);
  }

}
