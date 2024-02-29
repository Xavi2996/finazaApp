import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/users/';
  constructor() {}

  getUserInfo() {
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}`));
  }

  getAllCatIngresos() {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}categoria-ingreso`)
    );
  }

  getAllCatEgresos() {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}categoria-egreso`)
    );
  }
  deleteIngreso(id: string) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}deleteFavIngreso/${id}`)
    );
  }
  deleteEgreso(id: string) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}deleteFavEgreso/${id}`)
    );
  }
  insertFavIngreso(categoria: any) {
    console.log(categoria);

    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}insertFavIngreso`, categoria)
    );
  }
  insertFavEgreso(categoria: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}insertFavEgreso`, categoria)
    );
  }
  deleteDetalleIngreso(id: number) {
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}deleteDetalleIngreso/${id}`)
    );
  }
  deleteDetalleEgreso(id: number) {
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}deleteDetalleEgreso/${id}`)
    );
  }
}
