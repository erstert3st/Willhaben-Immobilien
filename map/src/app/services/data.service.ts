import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableData } from '../models/tableData';  // Import the interface


@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  private apiUrl: string  = 'http://localhost:4201';  // URL of the Python backend
  private willhabenQuery: string = this.apiUrl + "/query";
  private insertDrawData: string = this.apiUrl + "/insertDraw";

  constructor(private http: HttpClient) { }

  executeWillhabenDataQuery(sql: string): Observable<TableData[]> {
    return this.http.post<TableData[]>(this.willhabenQuery, { sql });
  }
  executeInsertQuery(sql: string): Observable<any> {
    return this.http.post<any>(this.insertDrawData, { sql });
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