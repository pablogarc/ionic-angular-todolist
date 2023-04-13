import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  constructor(private http: HttpClient) {}

  getTodoList(): Observable<any> {
    const url = environment.apiUrl + 'registers';
    return this.http.get(url);
  }

  createTask(task: string): Observable<any> {
    const url = environment.apiUrl + 'register';
    return this.http.post(url, { task }, { responseType: 'text' });
  }

  updateTask(id: number, task: string): Observable<any> {
    const url = environment.apiUrl + 'register/' + id;
    return this.http.put(url, { task }, { responseType: 'text' });
  }

  deleteTask(id: number): Observable<any> {
    const url = environment.apiUrl + 'register/' + id;
    return this.http.delete(url, { responseType: 'text' });
  }
}
