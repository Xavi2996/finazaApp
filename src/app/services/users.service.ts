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
      this.httpClient.get<any>(`${this.baseUrl}/categoria-ingreso`)
    );
  }

  getAllCatEgresos() {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/categoria-egreso`)
    );
  }
}
