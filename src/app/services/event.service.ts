// event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eventt } from '../models/event.model';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:3000/api/event';
  private bapiUrl = 'http://localhost:3000/api';
  allEvents : Eventt[] = [] // Your backend API URL
  participatedEvents: Eventt[] = []
  requestedEvents: Eventt[] = []
  constructor(private http: HttpClient, ) {}

  createEvent(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Authorization token from localStorage
    });

    return this.http.post(`${this.apiUrl}/createEvent`, formData, {
      headers,
    });
  }



  getAllEvents(): Observable<Eventt[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Authorization token from localStorage
    });
    return this.http.get<Eventt[]>(`${this.apiUrl}/availableEvents`, {
      headers,
    });
  }

  getPartitipatedEvents(): Observable<Eventt[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Authorization token from localStorage
    });
    return this.http.get<Eventt[]>(`${this.apiUrl}/participation/participatedEvents`, {
      headers,
    });
  }

  getRequestedEvents(): Observable<Eventt[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Authorization token from localStorage
    });
    return this.http.get<Eventt[]>(`${this.apiUrl}/request/requestedEvents`, {
      headers,
    });
  }
}
