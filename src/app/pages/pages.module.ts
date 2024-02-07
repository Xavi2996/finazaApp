import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ResumenComponent } from './resumen/resumen.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { HistoricoComponent } from './historico/historico.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [ResumenComponent, IngresoEgresoComponent, HistoricoComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}
