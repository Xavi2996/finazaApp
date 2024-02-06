import { Component, inject } from '@angular/core';
import { DateInEgModel } from 'src/app/modelos/date.model';
import { IngresosEgresosService } from 'src/app/services/ingresos-egresos.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css'],
})
export class IngresoEgresoComponent {
  private dateInEg!: DateInEgModel;

  //Servicios
  ingresosEgresosService = inject(IngresosEgresosService);
  userService = inject(UsersService);
  mensajeServide = inject(MensajesService);

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

  years: number[] = [2024, 2025, 2026];

  mesSeleccionado: number = new Date().getMonth() + 1;
  yearSeleccionado: number = new Date().getFullYear();

  selectedMonthIndex: number = 0;
  ingresosEgresosTotal: any;
  ingresosEgresosTotalMonth: any;
  user: any;
  userId: number = 0;
  mesInt: number = new Date().getMonth() + 1;
  verDetalle: boolean = false;
  ingresos: number = 0;
  egresos: number = 0;
  ingresosDetalle: any[] = [];
  egresosDetalle: any[] = [];
  catIngresos: any = [];
  catEgresos: any = [];
  responsiveOptions: any[] | undefined;
  categoria_ingresos: any;
  categoria_egresos: any;

  cars = [
    { vin: 'QW12P0412GS068261', year: 2010, brand: 'Audi', color: 'Black' },
    { vin: 'JTHBM8A73EL206096', year: 2011, brand: 'BMW', color: 'White' },
    // más coches
  ];
  ngOnInit() {
    this.cargarListas();
  }

  constructor() {
    this.getUser();
  }

  async getUser() {
    this.mensajeServide.loading(true);
    try {
      this.user = await this.userService.getUserInfo();
      if (this.user.respuesta) {
        this.userId = this.user.resultado[0].id;
        this.mensajeServide.loading(false);
        if (this.userId != 0) {
          this.allIngresosEgresosDate();
          this.categoriesIngresos();
          this.categoriesEgresos();
        }
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
        //console.log(this.ingresosEgresosTotal);
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

  async categoriesIngresos() {
    this.mensajeServide.loading(true);
    try {
      this.catIngresos = await this.userService.getAllCatIngresos();
      this.categoria_ingresos = this.catIngresos.resultado;
      // console.log(this.catIngresos);
    } catch (error) {
      this.mensajeServide.mensajeError(
        'Error',
        this.ingresosEgresosTotal.mensaje
      );
    }
  }

  async categoriesEgresos() {
    this.mensajeServide.loading(true);
    try {
      this.catEgresos = await this.userService.getAllCatEgresos();
      this.categoria_egresos = this.catEgresos.resultado;
      // console.log(this.catEgresos);
    } catch (error) {
      this.mensajeServide.mensajeError(
        'Error',
        this.ingresosEgresosTotal.mensaje
      );
    }
  }

  async onYearChange(year: number) {
    this.mensajeServide.loading(true);
    this.dateInEg = new DateInEgModel();
    this.dateInEg.id = this.userId;
    this.dateInEg.year = this.yearSeleccionado;
    this.dateInEg.month = this.mesSeleccionado;
    console.log(this.dateInEg);
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

  async onMonthChange(month: number) {
    this.mensajeServide.loading(true);
    this.dateInEg = new DateInEgModel();
    this.dateInEg.id = this.userId;
    this.dateInEg.year = this.yearSeleccionado;
    this.dateInEg.month = this.mesSeleccionado;
    console.log(this.dateInEg);
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
  elimnarCategoria(nombre: any, tipo: string) {
    console.log(nombre);
    let categoriaIngreso = this.categoria_ingresos.find(
      (element: any) => nombre == element.nombre
    );
    let categoriaEgreso = this.categoria_egresos.find(
      (element: any) => nombre == element.nombre
    );

    if (tipo === 'ingresos') {
      console.log(categoriaIngreso.id);
    } else if (tipo === 'egresos') {
      console.log(categoriaEgreso.id);
    }
  }

  cargarListas() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
