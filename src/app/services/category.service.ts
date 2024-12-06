// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/admin/categories/'; // Change this to your actual API URL if needed

  constructor(private http: HttpClient) {}

  // Method to get all categories
  getAllCategories(): Observable<Category[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Authorization token from localStorage
    });
    return this.http.get<Category[]>(`${this.apiUrl}/public/all`, { headers });
  }
}

