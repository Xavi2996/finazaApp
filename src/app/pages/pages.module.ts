import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ResumenComponent } from './resumen/resumen.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { HistoricoComponent } from './historico/historico.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ResumenComponent, IngresoEgresoComponent, HistoricoComponent],
  imports: [CommonModule, PagesRoutingModule, HttpClientModule],
})
export class PagesModule {}
