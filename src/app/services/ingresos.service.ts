import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { GastoIngresoModel } from '../modelos/gastos.model';

@Injectable({
  providedIn: 'root',
})
export class IngresosService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/ingresos/';
  constructor() {}

  createIngreso(ingreso: GastoIngresoModel) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}`, ingreso)
    );
  }
}
