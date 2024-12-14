import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from "@angular/forms";
import { InterfazAlumnos } from "../../interfaces/alumnos";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.page.html",
  styleUrls: ["./registro.page.scss"],
})
export class RegistroPage implements OnInit {
  alumnoData: any;

  newAlumno: InterfazAlumnos = {
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    password: "",
    isactive: false,
  };

  registroForm: FormGroup;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authservice: AuthService,
    private builder: FormBuilder
  ) {
    this.registroForm = this.builder.group({
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(80),
        Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$"),
      ]),
      apellido: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(80),
        Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$"),
      ]),
      rut: new FormControl("", [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(10),
        Validators.pattern("[0-9]+[-]?[0-9kK]{1}$"),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(16),
      ]),
    });
  }

  redireccionPagina() {
    this.router.navigate(["/inicio"]);
  }

  crearAlumno() {
    if (this.registroForm.valid) {
      this.authservice
        .getUserByEmail(this.registroForm.value.email)
        .subscribe((resp) => {
          this.alumnoData = resp;
          if (this.alumnoData.length > 0) {
            this.alumnoDuplicado();
            this.registroForm.reset();
          } else {
            this.newAlumno = {
              nombre: this.registroForm.value.nombre,
              apellido: this.registroForm.value.apellido,
              rut: this.registroForm.value.rut,
              email: this.registroForm.value.email,
              password: this.registroForm.value.password,
              isactive: true,
            };
            this.authservice.PostAlumno(this.newAlumno).subscribe();
            this.registroForm.reset();
            this.Success();
            this.router.navigateByUrl("/inicio");
          }
        });
    } else {
      this.Empty();
    }
  }

  async Empty() {
    const alert = await this.alertController.create({
      header: "¡Ups! Los campos están vacíos.",
      message: "Rellene con sus datos, por favor.",
      buttons: ["OK"],
    });
    await alert.present();
  }

  async Success() {
    const alert = await this.alertController.create({
      header: "¡Registrado exitosamente!",
      message: "Ahora podrás loguearte, " + this.newAlumno.nombre + ".",
      buttons: ["OK"],
    });
    await alert.present();
  }

  async alumnoDuplicado() {
    const alerta = await this.alertController.create({
      header: "¡Ups! Esta dirección de email ya está registrada.",
      message: "Inténtelo nuevamente.",
      buttons: ["OK"],
    });
    alerta.present();
    return;
  }

  ngOnInit() {}
}
