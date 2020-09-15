import { Injectable } from '@angular/core';
import {
  HttpClient,
  // HttpHeaders,
  // HttpErrorResponse,
  // HttpParams,
  // HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:3000/api/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
}
