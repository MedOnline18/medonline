import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = localStorage.getItem('token');
  private user = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  getUserUpdateListener() {
    return this.user.asObservable();
  }

  resetUser() {
    this.user.next(null);
  }

  login(data) {
    return this.http.post('http://medonline.michal-kos.pl/backend/public/api/userLogin', data)
      .pipe(tap((response: any) => {
        this.user.next({ ...response.data });
      }));
  }
  register(data) {
      return this.http.post('http://medonline.michal-kos.pl/backend/public/api/userRegister', data);
  }

  edit(data) {
    return this.http.post('http://medonline.michal-kos.pl/backend/public/api/userUpdate', data,
    { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) });
  }

}
