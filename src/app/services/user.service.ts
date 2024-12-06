import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';
import { VerifyCode } from '../models/verify-code.model';
import { jwtDecode } from 'jwt-decode';
import { AccountConnected } from '../models/account-connected.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseApiUrl: string = 'http://localhost:3000/api/';
  public confirmEmail: string = '';
  private token: string | null = null;
  public userConnected: AccountConnected | undefined ;


  constructor(private http: HttpClient) {}

  // Save token after login or event creation
  setToken(newToken: string): void {
    this.token = newToken;
    localStorage.setItem('token', newToken);
    console.log("token setted with success!")
    console.log(newToken)

  }



  // Get the token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserConnected(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
  
    // Ensure baseApiUrl ends with a /
    return this.http.get(`${this.baseApiUrl}user/getUserByEmail`, { params });
  }
  
  // Attach token to HTTP requests
  getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
  }

  // Example: Call backend to create an event


  // Signup request
  onSignup(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}auth/signup`, user);
  }

  // Login request
  onLogin(login: Login): Observable<any> {
    return this.http.post(`${this.baseApiUrl}auth/login`, login, { observe: 'response' });
  }
  

  // Verify email code request
  verifyEmailCode(verifyCode: VerifyCode): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}auth/verify`, verifyCode);
  }



  editUserProfile(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Authorization token from localStorage
    });

    return this.http.put(`${this.baseApiUrl}user/editProfile`, formData, {
      headers,
    });
  }



}
