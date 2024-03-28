import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngresosEgresosService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/ingreso-egreso/';
  constructor() {}

  getAllIngresosEgresos() {
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}`));
  }

  getAllIngreEgreDate(date: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}valoresDate`, date)
    );
  }
  getAllgastosMonths(year: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}gastosTotalMonth`, year)
    );
  }
}
