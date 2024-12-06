import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Center } from '../models/center.model';

@Injectable({
  providedIn: 'root',
})
export class CenterService {
  private apiUrl = 'http://localhost:3000/api/admin/centers/'; // Change this to your actual API URL if needed

  constructor(private http: HttpClient) {}


  getAllCenters(): Observable<Center[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Authorization token from localStorage
    });
    return this.http.get<Center[]>(`${this.apiUrl}/public/all`, { headers });
  }
}
