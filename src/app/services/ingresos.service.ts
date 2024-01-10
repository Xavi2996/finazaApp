import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IngresosService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/ingresos/';
  constructor() {}
}
