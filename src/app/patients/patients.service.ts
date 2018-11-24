import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(
    private http: HttpClient
  ) { }

  getUserDetails() {
    const token = localStorage.getItem('token');
    return this.http.get('http://medonline.michal-kos.pl/backend/public/api/userDetails',
    { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) })
      .pipe(map((response: any) => response.success));
  }
}
