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
import { NewProfesor } from "src/interfaces/profesores";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.page.html",
  styleUrls: ["./registro.page.scss"],
})
export class RegistroPage implements OnInit {
  profesorData: any;

  newProfesor: NewProfesor = {
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

  crearProfesor() {
    if (this.registroForm.valid) {
      this.authservice
        .getUserByEmail(this.registroForm.value.email)
        .subscribe((resp) => {
          this.profesorData = resp;
          if (this.profesorData.length > 0) {
            this.profesorDuplicado();
            this.registroForm.reset();
          } else {
            this.newProfesor = {
              nombre: this.registroForm.value.nombre,
              apellido: this.registroForm.value.apellido,
              rut: this.registroForm.value.rut,
              email: this.registroForm.value.email,
              password: this.registroForm.value.password,
              isactive: true,
            };
            this.authservice.PostAlumno(this.newProfesor).subscribe();
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
      message: "Ahora podrás loguearte, " + this.newProfesor.nombre + ".",
      buttons: ["OK"],
    });
    await alert.present();
  }

  async profesorDuplicado() {
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
