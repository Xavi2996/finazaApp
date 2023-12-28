import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ResumenComponent } from './resumen/resumen.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { HistoricoComponent } from './historico/historico.component';


@NgModule({
  declarations: [
    ResumenComponent,
    IngresoEgresoComponent,
    HistoricoComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
