import { Component, inject } from '@angular/core';
import { Chart } from 'chart.js';
import { DateInEgModel } from 'src/app/modelos/date.model';
import { IngresosEgresosService } from 'src/app/services/ingresos-egresos.service';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
})
export class HistoricoComponent {
  mensajeServide = inject(MensajesService);
  ingresosEgresosService = inject(IngresosEgresosService);

  dateInEg: DateInEgModel = new DateInEgModel();
  userId: number = 6;
  mesSeleccionado: number = new Date().getMonth() + 1;
  yearSeleccionado: number = new Date().getFullYear();
  ingresosEgresosTotal: any;
  verDetalle: boolean = false;
  ingresos: number = 0;
  egresos: number = 0;
  ingresosDetalle: any;
  egresosDetalle: any;

  //Gráfico tipo barra
  ingresosPorMes: number[] = [1, 2, 3];
  egresosPorMes: number[] = [4, 5, 6];
  meses: string[] = [
    'Enero',
    'febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembr',
  ];
  ngOnInit() {
    this.crearGraficoIngresosEgresos();
  }

  async allIngresosEgresosDate() {
    this.mensajeServide.loading(true);
    this.dateInEg = new DateInEgModel();
    this.dateInEg.id = this.userId;
    this.dateInEg.year = this.yearSeleccionado;
    this.dateInEg.month = this.mesSeleccionado;
    //console.log(this.dateInEg);
    try {
      this.ingresosEgresosTotal =
        await this.ingresosEgresosService.getAllIngreEgreDate(this.dateInEg);
      if (this.ingresosEgresosTotal.respuesta) {
        console.log(this.ingresosEgresosTotal);
        this.verDetalle = true;
        this.ingresos = this.ingresosEgresosTotal.resultado.ingresosTotal;
        this.egresos = this.ingresosEgresosTotal.resultado.egresosTotal;
        this.ingresosDetalle = this.ingresosEgresosTotal.resultado.ingresos;
        this.egresosDetalle = this.ingresosEgresosTotal.resultado.egresos;
        this.mensajeServide.loading(false);
      }
    } catch (error) {
      this.mensajeServide.mensajeError(
        'Error',
        this.ingresosEgresosTotal.mensaje
      );
    }
  }
  crearGraficoIngresosEgresos() {
    this.allIngresosEgresosDate();
    const ctx = document.getElementById('myChart');
    if (ctx === null) {
      console.error(
        'No se pudo encontrar el elemento con id "myChart". Asegúrate de que existe en tu HTML.'
      );
      return;
    }
    const myChart = new Chart(ctx as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: this.meses,
        datasets: [
          {
            label: 'Ingresos',
            data: this.ingresosPorMes,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Egresos',
            data: this.egresosPorMes,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
