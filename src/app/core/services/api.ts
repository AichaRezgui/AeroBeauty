import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:9090'; 

  constructor(private http: HttpClient) {}

  get<T>(path: string, params?: any): Observable<T> {
    return this.http.get<T>(`${this.base}/${path}`, { params });
  }

  getById<T>(path: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.base}/${path}/${id}`);
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.base}/${path}`, body);
  }

  put<T>(path: string, id: number, body: any): Observable<T> {
    return this.http.put<T>(`${this.base}/${path}/${id}`, body);
  }

  delete<T>(path: string, id: number): Observable<T> {
    return this.http.delete<T>(`${this.base}/${path}/${id}`);
  }
}
