import { Component, inject } from '@angular/core';
import { DateInEgModel } from 'src/app/modelos/date.model';
import { IngresosEgresosService } from 'src/app/services/ingresos-egresos.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { UsersService } from 'src/app/services/users.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
})
export class ResumenComponent {
  //Modelos
  private dateInEg!: DateInEgModel;
  public chart: any;

  //Servicios
  ingresosEgresosService = inject(IngresosEgresosService);
  userService = inject(UsersService);
  mensajeServide = inject(MensajesService);

  today = new Date();
  years: number[] = [2024, 2025, 2026];
  months: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  selectedIndex: number = new Date().getMonth();
  selectedMonthIndex: number = 0;
  yearSelect: number = new Date().getFullYear();
  ingresosEgresosTotal: any;
  ingresosEgresosTotalMonth: any;
  user: any;
  userId: number = 0;
  mesInt: number = new Date().getMonth() + 1;

  ngOnInit() {
    this.getUser();
    this.selectedIndex = this.years.indexOf(this.yearSelect);
    console.log(this.mesInt);
    this.createChart();
  }

  async getUser() {
    this.mensajeServide.loading(true);
    try {
      this.user = await this.userService.getUserInfo();
      const { respuesta, mensaje, resultado } = this.user;
      console.log(respuesta);
      console.log(resultado);

      if (respuesta) {
        this.userId = resultado[0].id;
        console.log(this.userId);
        this.allIngresosEgresosDate();
        // this.allIngresosEgresos();
      }
    } catch (error) {}
  }

  getFechaFormat() {
    let today = new Date();
    let formattedDate = `${today.getFullYear()}-${(
      '0' +
      (today.getMonth() + 1)
    ).slice(-2)}-${('0' + today.getDate()).slice(-2)} ${(
      '0' + today.getHours()
    ).slice(-2)}:${('0' + today.getMinutes()).slice(-2)}:${(
      '0' + today.getSeconds()
    ).slice(-2)}`;
    console.log(formattedDate);
  }

  filtrarYear(index: number) {
    this.selectedIndex = index;
    this.yearSelect = this.years[index];
    this.allIngresosEgresosDate();
  }

  filtrarMonth(index: number) {
    if (this.selectedMonthIndex === index) {
      console.log('entra if');

      this.selectedMonthIndex = -1;
    } else {
      this.selectedMonthIndex = index;
      console.log('entra else');
      this.selectedMonthIndex < 6
        ? (this.mesInt = Number(`0${this.selectedMonthIndex + 1}`))
        : (this.mesInt = this.selectedMonthIndex + 1);
      this.allIngresosEgresosDate();
    }
  }

  async allIngresosEgresos() {
    try {
      this.ingresosEgresosTotal =
        await this.ingresosEgresosService.getAllIngresosEgresos();
      console.log(this.ingresosEgresosTotal);
      this.mensajeServide.loading(false);
    } catch (error) {}
  }
  async allIngresosEgresosDate() {
    this.dateInEg = new DateInEgModel();
    this.dateInEg.id = this.userId;
    this.dateInEg.year = this.yearSelect;
    this.dateInEg.month = this.mesInt;
    console.log(this.dateInEg);
    this.mensajeServide.loading(true);
    try {
      this.ingresosEgresosTotal =
        await this.ingresosEgresosService.getAllIngreEgreDate(this.dateInEg);
      console.log(this.ingresosEgresosTotal);
      this.mensajeServide.loading(false);
    } catch (error) {
      console.log(error);
    }
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'pie', // Tipo de gráfico de pastel
      data: {
        labels: ['Ingresos', 'Egresos'],
        datasets: [
          {
            label: 'Ingresos y Egresos',
            data: [20, 100], // Reemplazar con los valores de tus datos
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)', // Color para ingresos
              'rgba(255, 99, 132, 0.2)', // Color para egresos
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)', // Borde para ingresos
              'rgba(255, 99, 132, 1)', // Borde para egresos
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // Otras opciones si son necesarias
      },
    });
  }
}
