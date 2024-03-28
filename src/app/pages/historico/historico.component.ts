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
  gastosArray: any;
  myChart: any;
  mensajeNohayData: string = 'No hay datos para mostrar, Seleccione otro año.';
  viewMnsj: boolean = false;
  //Gráfico tipo barra
  ingresosPorMes: number[] = [];
  year: number = this.yearSeleccionado;
  egresosPorMes: number[] = [];
  mesesIngresosNumbrers: number[] = [];
  mesesEgresosNumbers: number[] = [];
  meses: string[] = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];
  ngOnInit() {
    this.cambiarYear();
  }

  crearGraficoIngresosEgresos() {
    console.log(this.ingresosPorMes, this.egresosPorMes);
    const ctx = document.getElementById('myChart');
    if (ctx === null) {
      console.error(
        'No se pudo encontrar el elemento con id "myChart". Asegúrate de que existe en tu HTML.'
      );
      return;
    }
    this.myChart = new Chart(ctx as HTMLCanvasElement, {
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

  async cambiarYear() {
    this.mensajeServide.loading(true);
    this.viewMnsj = false;
    this.ingresosPorMes = new Array(12).fill(0);
    this.egresosPorMes = new Array(12).fill(0);
    this.yearSeleccionado = this.year;
    let year = { year: this.yearSeleccionado };
    if (this.myChart) {
      this.myChart.destroy();
    }

    try {
      this.gastosArray = await this.ingresosEgresosService.getAllgastosMonths(
        year
      );
      console.log(this.gastosArray);

      if (this.gastosArray.respuesta) {
        this.mensajeServide.loading(false);
        this.gastosArray.resultado.ingresos.forEach((element: any) => {
          this.ingresosPorMes[element.mes - 1] = Number(element.gasto_total);
        });

        this.gastosArray.resultado.egresos.forEach((element: any) => {
          this.egresosPorMes[element.mes - 1] = Number(element.gasto_total);
        });
        this.crearGraficoIngresosEgresos();
      } else {
        this.mensajeServide.loading(false);
        this.mensajeServide.mensajeError(this.gastosArray.mensaje, 'Info');
        this.viewMnsj = true;
      }
    } catch (error) {
      this.mensajeServide.mensajeError('Error', this.gastosArray.mensaje);
    }
  }
  onButtonFocusOut(event: any) {
    event.target.style.outline = 'none';
    event.target.style.border = 'none';
    event.target.style.boxShadow = 'none';
  }
}
