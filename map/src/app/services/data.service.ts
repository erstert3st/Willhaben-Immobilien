import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableData } from '../models/tableData';  // Import the interface


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:4201/query';  // URL of the Python backend

  constructor(private http: HttpClient) { }

  executeQuery(sql: string): Observable<TableData[]> {
    return this.http.post<TableData[]>(this.apiUrl, { sql });
  }

  getDataFromDb(dbStatemant: string) {
    return this.executeQuery(dbStatemant);
  }
}