// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthSessionService } from './auth-session.service';

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
}

export interface PaginatedResponse<T> {
  links: {
    next: string | null;
    previous: string | null;
  };
  pages: {
    total_pages: number;
    count: number;
    current: number;
    size: number;
  };
  results: T[];
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = `${environment.apiBaseUrl}/tasks/`;

  constructor(
    private http: HttpClient,
    private authSession: AuthSessionService
  ) {}

  private get headers() {
    return {
      headers: {
        Authorization: `Bearer ${this.authSession.getAccessToken()}`,
      },
    };
  }

  list(params?: any): Observable<PaginatedResponse<Task>> {
    return this.http.get<PaginatedResponse<Task>>(this.apiUrl, {
      ...this.headers,
      params,
    });
  }

  retrieve(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}${id}/`, this.headers);
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, this.headers);
  }

  update(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}${id}/`, task, this.headers);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`, this.headers);
  }
}
