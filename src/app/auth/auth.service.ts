import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
  login(data) {
    return this.http.post('http://medonline.michal-kos.pl/backend/public/api/userLogin', data)
      .pipe(map((respons: any) => respons.success.token));
  }

}
