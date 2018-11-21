import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(data) {
    this.http.post('http://medonline.michal-kos.pl/backend/public/api/loginUser', data)
      .subscribe(res => console.log(res));
  }

}
