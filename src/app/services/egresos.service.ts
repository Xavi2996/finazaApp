import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GastoEgresoModel } from '../modelos/gastos.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EgresosService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/egresos/';
  constructor() {}
  createEgreso(egreso: GastoEgresoModel) {
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}`, egreso));
  }
}
