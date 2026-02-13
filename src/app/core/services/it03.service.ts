import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class It03Service {

  private api = 'http://localhost:5001/api/it03';

  constructor(private http: HttpClient) {}

  getAll(pageNumber = 1, pageSize = 10) {
    return this.http.get<any>(
      `${this.api}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  approve(id: number, reason: string) {
    return this.http.post(`${this.api}/${id}/approve`, { reason });
  }

  reject(id: number, reason: string) {
    return this.http.post(`${this.api}/${id}/reject`, { reason });
  }
}