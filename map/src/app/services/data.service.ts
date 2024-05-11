import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableData } from '../models/tableData';  // Import the interface


@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  private apiUrl = 'http://localhost:4201/query';  // URL of the Python backend

  constructor(private http: HttpClient) { }

  executeWillhabenDataQuery(sql: string): Observable<TableData[]> {
    return this.http.post<TableData[]>(this.apiUrl, { sql });
  }
  executeInsertQuery(sql: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { sql });
}
  executeSelectListQuery(sql: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { sql });
  }

  getWillhabenDataFromDb(dbStatemant: string) {
    return this.executeWillhabenDataQuery(dbStatemant);
  }

  getListFromDb(dbStatemant: string) {
    return this.executeSelectListQuery(dbStatemant);
  }
  insertDataToDb(dbStatemant: string) {
    return this.executeInsertQuery(dbStatemant);
  }
}