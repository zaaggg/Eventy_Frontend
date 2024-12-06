import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountConnected } from '../models/account-connected.model';
import { ParticipationResponse } from '../models/participation-response.model';

@Injectable({
  providedIn: 'root',
})
export class ParticipationService {
  private apiUrl = 'http://localhost:3000/api/event/request'; 
  private apiUrll = 'http://localhost:3000/api'// API base URL

  constructor(private http: HttpClient) {}

  sendParticipationRequest(eventId: string): Observable<any> {
    const token = localStorage.getItem('token'); // Ensure 'auth-token' is the correct key
    if (!token) {
      // Handle the case when there's no token
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Authorization token from localStorage
    });

    // Send the POST request with the headers as part of the options
    return this.http.post(`${this.apiUrl}/send/${eventId}`, {},{ headers });
  }

  cancelParticipationRequest(eventId: string): Observable<any> {
    const token = localStorage.getItem('token'); // Ensure 'auth-token' is the correct key
    if (!token) {
      // Handle the case when there's no token
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Authorization token from localStorage
    });

    return this.http.delete(`${this.apiUrl}/cancel/${eventId}`, { headers });
  }



  approveRequest(requestParticipationId: string): Observable<any> {
    const token = localStorage.getItem('token'); // Ensure 'auth-token' is the correct key
    if (!token) {
      // Handle the case when there's no token
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Authorization token from localStorage
    });

    return this.http.patch(
      `${this.apiUrll}/event/participation/${requestParticipationId}/status`,
      { status: 'approved' },
      { headers }
    );
  }

  // Reject participation request
  rejectRequest(requestParticipationId: string): Observable<any> {
    const token = localStorage.getItem('token'); // Ensure 'auth-token' is the correct key
    if (!token) {
      // Handle the case when there's no token
      throw new Error('No token found');
    }

    

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Authorization token from localStorage
    });

    return this.http.patch(
      `${this.apiUrll}/event/participation/${requestParticipationId}/status`,
      { status: 'rejected' },
      { headers }
    );
  } 

  getAllRequests(eventId: string): Observable<{ message: string; requests: ParticipationResponse[] }> {
    return this.http.get<{ message: string; requests: ParticipationResponse[] }>(
      `${this.apiUrl}/all/${eventId}`
    );
  }

  verifyCheckIn(qrCodeData: string): Observable<any> {
    const token = localStorage.getItem('token'); // Ensure 'auth-token' is the correct key
    if (!token) {
      // Handle the case when there's no token
      throw new Error('No token found');
    }
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Authorization token from localStorage
    });

    return this.http.post(`${this.apiUrll}/event/participation/checkIn`, { qrCodeData } , { headers });
  }

}
