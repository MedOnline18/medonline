import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = localStorage.getItem('token');

  constructor(
    private http: HttpClient
  ) { }
  login(data) {
    return this.http.post('http://medonline.michal-kos.pl/backend/public/api/userLogin', data)
      .pipe(map((respons: any) => respons.success.token));
  }
  register(data) {
      return this.http.post('http://medonline.michal-kos.pl/backend/public/api/userRegister', data);
  }

  edit(data) {
    console.log(this.token);
    return this.http.post('http://medonline.michal-kos.pl/backend/public/api/userUpdate', data,
    { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) });
  }

}
