import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EgresosService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/egresos/';
  constructor() {}
}
