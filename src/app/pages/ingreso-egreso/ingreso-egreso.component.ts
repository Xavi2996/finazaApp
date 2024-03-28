import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateInEgModel } from 'src/app/modelos/date.model';
import {
  GastoEgresoModel,
  GastoIngresoModel,
} from 'src/app/modelos/gastos.model';
import { EgresosService } from 'src/app/services/egresos.service';
import { IngresosEgresosService } from 'src/app/services/ingresos-egresos.service';
import { IngresosService } from 'src/app/services/ingresos.service';
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
  ingreso = inject(IngresosService);
  egreso = inject(EgresosService);

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

  years: number[] = [2024, 2025, 2026, 2027];

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
  ingresosDelete: any;
  egresosDelete: any;
  ingresosFormGroup: FormGroup = new FormGroup({});
  egresosFormGroup: FormGroup = new FormGroup({});
  viewFormIngresos: boolean = false;
  viewFormEgresos: boolean = false;
  submitIngresosForm: boolean = false;
  submitEgresosForm: boolean = false;
  favoritosIngresos: any;
  favoritosEgresos: any;
  inputForm: string = '';
  ingresoDetalleDelete: any;
  egresoDetalleDelete: any;
  gastoIngreso: GastoIngresoModel = new GastoIngresoModel();
  gastoEgreso: GastoEgresoModel = new GastoEgresoModel();
  gastoIngresoCreado: any;
  gastoEgresoCreado: any;
  formattedDate: string = '';

  cars = [
    { vin: 'QW12P0412GS068261', year: 2010, brand: 'Audi', color: 'Black' },
    { vin: 'JTHBM8A73EL206096', year: 2011, brand: 'BMW', color: 'White' },
    // más coches
  ];
  ngOnInit() {
    this.cargarListas();
    this.crearFormulario();
  }

  constructor() {
    this.getUser();
  }

  crearFormulario() {
    this.ingresosFormGroup = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      valor: new FormControl('', [Validators.required]),
    });

    this.egresosFormGroup = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      valor: new FormControl('', [Validators.required]),
    });
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
    this.formattedDate = `${today.getFullYear()}-${(
      '0' +
      (today.getMonth() + 1)
    ).slice(-2)}-${('0' + today.getDate()).slice(-2)} ${(
      '0' + today.getHours()
    ).slice(-2)}:${('0' + today.getMinutes()).slice(-2)}:${(
      '0' + today.getSeconds()
    ).slice(-2)}`;
    console.log(this.formattedDate);
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

  async categoriesIngresos() {
    this.mensajeServide.loading(true);
    try {
      this.catIngresos = await this.userService.getAllCatIngresos();
      this.categoria_ingresos = this.catIngresos.resultado;
      this.mensajeServide.loading(false);
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
      this.mensajeServide.loading(false);
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
    console.log(nombre, tipo);
    let categoriaIngreso = this.categoria_ingresos.find(
      (element: any) => nombre == element.nombre
    );
    let categoriaEgreso = this.categoria_egresos.find(
      (element: any) => nombre == element.nombre
    );

    if (tipo === 'ingresos') {
      console.log(categoriaIngreso.id);
      this.categoriaIngesoDelete(categoriaIngreso.id);
    } else if (tipo === 'egresos') {
      console.log(categoriaEgreso.id);
      this.categoriaEgresoDelete(categoriaEgreso.id);
    }
  }

  async categoriaIngesoDelete(id: string) {
    this.mensajeServide.loading(true);
    try {
      this.ingresosDelete = await this.userService.deleteIngreso(id);
      this.mensajeServide.loading(false);
      this.categoriesIngresos();
      console.log(this.ingresosDelete);
    } catch (error) {
      this.mensajeServide.mensajeError('Error', this.ingresosDelete.mensaje);
    }
  }
  async categoriaEgresoDelete(id: string) {
    this.mensajeServide.loading(true);
    try {
      this.egresosDelete = await this.userService.deleteEgreso(id);
      this.mensajeServide.loading(false);
      this.categoriesEgresos();
      console.log(this.egresosDelete);
    } catch (error) {
      this.mensajeServide.mensajeError('Error', this.ingresosDelete.mensaje);
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

  async formIngresos() {
    this.mensajeServide.loading(true);
    this.submitIngresosForm = true;
    console.log(this.ingresosFormGroup.valid);
    console.log(this.ingresosFormGroup.controls);
    if (!this.ingresosFormGroup.valid) {
      this.ingresosFormGroup.markAllAsTouched();
    } else {
      this.getFechaFormat();
      this.viewFormIngresos = false;
      this.submitIngresosForm = false;
      this.gastoIngreso.cantidad = this.ingresosFormGroup.get('valor')?.value;
      this.gastoIngreso.categoria = this.ingresosFormGroup.get('nombre')?.value;
      this.gastoIngreso.fecha = this.formattedDate;
      this.gastoIngreso.usuario = this.userId;
      this.ingresosFormGroup.reset();
      console.log(this.gastoIngreso);

      try {
        this.gastoIngresoCreado = await this.ingreso.createIngreso(
          this.gastoIngreso
        );
        this.mensajeServide.loading(false);
        console.log(this.gastoIngresoCreado);
      } catch (error) {
        this.mensajeServide.mensajeError(
          'Error',
          this.gastoIngresoCreado.mensaje
        );
      }
    }
  }
  async formEgresos() {
    this.submitEgresosForm = true;
    console.log(this.egresosFormGroup.valid);
    console.log(this.egresosFormGroup.controls);
    if (!this.egresosFormGroup.valid) {
      this.egresosFormGroup.markAllAsTouched();
    } else {
      this.getFechaFormat();
      this.viewFormEgresos = false;
      this.submitEgresosForm = false;
      this.gastoEgreso.cantidad = this.egresosFormGroup.get('valor')?.value;
      this.gastoEgreso.categoria = this.egresosFormGroup.get('nombre')?.value;
      this.gastoEgreso.fecha = this.formattedDate;
      this.gastoEgreso.usuario = this.userId;
      this.egresosFormGroup.reset();
      console.log(this.gastoEgreso);
      try {
        this.gastoEgresoCreado = await this.egreso.createEgreso(
          this.gastoEgreso
        );
        this.mensajeServide.loading(false);
        console.log(this.gastoEgresoCreado);
      } catch (error) {
        this.mensajeServide.mensajeError(
          'Error',
          this.gastoEgresoCreado.mensaje
        );
      }
    }
  }

  async agregarFavorito(tipo: string) {
    if (tipo == 'ingresos') {
      this.inputForm = this.ingresosFormGroup.get('nombre')?.value.trim();
      console.log(this.inputForm);
      let sendFavorito = { categoria: this.inputForm };
      if (this.inputForm !== '') {
        try {
          this.mensajeServide.loading(true);
          this.favoritosIngresos = await this.userService.insertFavIngreso(
            sendFavorito
          );
          this.mensajeServide.loading(false);
          console.log(this.favoritosIngresos);
          if (this.favoritosIngresos.respuesta) {
            this.categoriesIngresos();
          }
        } catch (error) {
          this.mensajeServide.mensajeError(
            'Error',
            this.ingresosDelete.mensaje
          );
        }
      }
    } else {
      this.inputForm = this.egresosFormGroup.get('nombre')?.value.trim();
      console.log(this.inputForm);
      let sendFavorito = { categoria: this.inputForm };
      if (this.inputForm !== '') {
        try {
          this.mensajeServide.loading(true);
          this.favoritosEgresos = await this.userService.insertFavEgreso(
            sendFavorito
          );
          this.mensajeServide.loading(false);
          console.log(this.favoritosEgresos);
          if (this.favoritosEgresos.respuesta) {
            this.categoriesEgresos();
          }
        } catch (error) {
          this.mensajeServide.mensajeError(
            'Error',
            this.ingresosDelete.mensaje
          );
        }
      }
    }
  }

  addGasto(tipo: string) {
    console.log(tipo);
    if (tipo == 'ingresos') {
      this.viewFormIngresos = true;
      this.viewFormEgresos = false;
    } else if (tipo == 'egresos') {
      this.viewFormIngresos = false;
      this.viewFormEgresos = true;
    }
  }

  addFavorito(nombre: string, tipo: string) {
    console.log(nombre);
    console.log(tipo);
    if (tipo == 'ingresos') {
      this.ingresosFormGroup.get('nombre')?.setValue(nombre);
      this.viewFormIngresos = true;
      this.viewFormEgresos = false;
    } else if (tipo == 'egresos') {
      this.egresosFormGroup.get('nombre')?.setValue(nombre);
      this.viewFormIngresos = false;
      this.viewFormEgresos = true;
    }
  }

  async eliminardetalle(id: number, tipo: string) {
    if (tipo == 'ingresos') {
      try {
        this.mensajeServide.loading(true);
        this.ingresoDetalleDelete = await this.userService.deleteDetalleIngreso(
          id
        );
        if (this.ingresoDetalleDelete.respuesta) {
          this.allIngresosEgresosDate();
        }
        this.mensajeServide.loading(false);
      } catch (error) {
        this.mensajeServide.mensajeError(
          'Error',
          this.ingresoDetalleDelete.mensaje
        );
      }
    } else if (tipo == 'egresos') {
      console.log('Ingresa a egresos');

      try {
        this.mensajeServide.loading(true);
        this.egresoDetalleDelete = await this.userService.deleteDetalleEgreso(
          id
        );
        console.log(this.egresoDetalleDelete);

        if (this.egresoDetalleDelete.respuesta) {
          this.allIngresosEgresosDate();
        }
        this.mensajeServide.loading(false);
      } catch (error) {
        this.mensajeServide.mensajeError(
          'Error',
          this.ingresoDetalleDelete.mensaje
        );
      }
    }
  }
}
