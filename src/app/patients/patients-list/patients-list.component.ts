import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit {
  public users;

  constructor(
    private patientsService: PatientsService
  ) { }

  ngOnInit() {
    this.patientsService.getUserDetails().subscribe(
      ((response: any) => {
        this.users = response;
      })
    );
  }

}
