import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsersDetails } from './users.interfaces';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token = localStorage.getItem('token');

  constructor(
    private http: HttpClient
  ) { }

  getUserDetails() {
    return this.http.get('http://medonline.michal-kos.pl/backend/public/api/usersDetails',
    { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) })
      .pipe(map((response: any) => response.success));
  }

  editUser(userId: number) {
    return this.http.get(`http://medonline.michal-kos.pl/backend/public/api/userDetails/${userId}`,
    { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) })
      .pipe(map((response: any) => response.success));
  }

  deleteUser(userId: number) {
    const params = {
      user_id: userId
    };
    return this.http.post('http://medonline.michal-kos.pl/backend/public/api/userDelete', params,
    { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) });
  }

  setAppointment(params) {
    return this.http.post('http://medonline.michal-kos.pl/backend/public/api/addTimetable', params,
    { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) });
  }
}
