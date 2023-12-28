import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumenComponent } from './resumen/resumen.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { HistoricoComponent } from './historico/historico.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'resumen' },
  { path: 'resumen', component: ResumenComponent },
  { path: 'ingreso-egreso', component: IngresoEgresoComponent },
  { path: 'historico', component: HistoricoComponent },
  { path: '**', redirectTo: 'resumen' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
