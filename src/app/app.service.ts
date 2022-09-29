import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  postData(file: any) {
    return this.http.post('http://localhost:9000/api/generateCcda', file);
  }
}
