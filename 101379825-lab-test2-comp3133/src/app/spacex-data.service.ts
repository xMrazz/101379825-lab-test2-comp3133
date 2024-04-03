import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from './models/mission';

@Injectable({
  providedIn: 'root'
})
export class SpacexDataService {
  private apiUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  // Get all launches
  getLaunches(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.apiUrl);
  }

  // Get launch by ID
  getLaunchById(id: string): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/${id}`);
  }
}