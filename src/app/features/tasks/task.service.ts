import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Task } from './task.model';
import { API_URL } from '../../core/api/api.config';
import { ApiResponse } from '../../core/api/api.response';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = `${API_URL}/tasks`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.http
      .get<ApiResponse<Task[]>>(this.baseUrl)
      .pipe(
        map(response => response.data)
      );
  }

  getById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  create(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  update(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}