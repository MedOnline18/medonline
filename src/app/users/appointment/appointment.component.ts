import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { UsersDetails } from '../users.interfaces';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  public visitForm: FormGroup;
  private user: UsersDetails;
  public users: UsersDetails[];
  public hours: string[];
  private dataToSend: any;
  public info: string;
  public minDate: Date;

  constructor(
    private formBulider: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.minDate = new Date();
    this.usersService.getUserDetails().subscribe(
      ((response: UsersDetails[]) => {
        if (this.user.user_role === '1') {
          this.users = response.filter((user: UsersDetails) => user.user_role === '2');
          this.info = 'Choose Patient';
        } else if (this.user.user_role === '2') {
          this.users = response.filter((user: UsersDetails) => user.user_role === '1');
          this.info = 'Choose Doctor';
        }
        this.visitForm = this.formBulider.group({
          user: ['', [ Validators.required ]],
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
    if (this.user.user_role === '1') {
      this.dataToSend = {
        doctor_id: this.user.id,
        user_id: data.user,
        date: date
      };
    } else if (this.user.user_role === '2') {
      this.dataToSend = {
        doctor_id: data.user,
        user_id: this.user.id,
        date: date
      };
    }
    this.usersService.checkAppointment(this.dataToSend.doctor_id, this.dataToSend.date)
      .subscribe((res: any) => {
        if (!res.success.status) {
          this.usersService.setAppointment(this.dataToSend).subscribe(
            () => this.router.navigate(['/'])
          );
        } else {
          this.snackBar.open('This date is already taken', 'Ok', { duration: 2000 });
        }
      });
  }

  prepareDate(data): string {
    const dateValue = data.date;
    const year = dateValue.getFullYear();
    let mounth = dateValue.getMonth() + 1;
    if (Number(mounth) < 10) {
      mounth = `0${mounth}`;
    }
    let day = dateValue.getDate();
    if (Number(day) < 10) {
      day = `0${day}`;
    }
    return `${year}-${mounth}-${day} ${data.hour}:00`;
  }

}
