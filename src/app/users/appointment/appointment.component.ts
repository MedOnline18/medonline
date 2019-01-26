import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { UsersDetails } from '../users.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  public visitForm: FormGroup;
  public patients: UsersDetails[];
  public hours: string[];

  constructor(
    private formBulider: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.usersService.getUserDetails().subscribe(
      ((response: UsersDetails[]) => {
        this.patients = response.filter((user: UsersDetails) => user.user_role === '2');
        this.visitForm = this.formBulider.group({
          patient: ['', [ Validators.required ]],
          date: ['', [ Validators.required]],
          hour: ['', [ Validators.required]],
        });
        this.prepareHours();
      })
    );
  }

  prepareHours() {
    this.hours = [
      '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
      '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
    ];
  }

  onConfirm() {
    const data = { ...this.visitForm.value };
    const date = this.prepareDate(data);
    const dataToSend = {
      doctor_id: 10,
      user_id: data.patient,
      date: date
    };
    this.usersService.setAppointment(dataToSend).subscribe(
      () => this.router.navigate(['/'])
    );
  }

  prepareDate(data): string {
    const dateValue = data.date;
    const year = dateValue.getFullYear();
    const mounth = dateValue.getMonth() + 1;
    const day = dateValue.getDate();
    return `${year}-0${mounth}-${day} ${data.hour}:00`;
  }

}
