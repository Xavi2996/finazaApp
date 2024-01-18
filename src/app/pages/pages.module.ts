import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ResumenComponent } from './resumen/resumen.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { HistoricoComponent } from './historico/historico.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ResumenComponent, IngresoEgresoComponent, HistoricoComponent],
  imports: [CommonModule, PagesRoutingModule, HttpClientModule, FormsModule],
})
export class PagesModule {}
