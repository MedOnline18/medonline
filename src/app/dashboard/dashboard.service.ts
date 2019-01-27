import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  token = localStorage.getItem('token');

  constructor(
    private http: HttpClient
  ) { }

  getVisits() {
    return this.http.get(`http://medonline.michal-kos.pl/backend/public/api/timetableDetails`,
    { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) })
      .pipe(map((response: any) => response.success));
  }

  deleteVisit(id: number) {
    const params = {
      timetable_id: id
    };
    return this.http.post('http://medonline.michal-kos.pl/backend/public/api/timetableDelete', params,
    { headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`) });
  }

}
