import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { AlertController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage implements OnInit {
  alumnodata: any;

  alumno = {
    id: "",
    rut: "",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    isactive: false,
  };

  loginForm: FormGroup;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private toast: ToastController,
    private alertcontroller: AlertController,
    private builder: FormBuilder
  ) {
    this.loginForm = this.builder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(16),
      ]),
    });
  }

  ngOnInit() {}

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authservice.getUserByEmail(email).subscribe((resp) => {
      this.alumnodata = resp;
      console.log(this.alumnodata);
      if (this.alumnodata.length === 0) {
        this.loginForm.reset();
        this.AlumnoNoExiste();
        return;
      }

      this.alumno = {
        id: this.alumnodata[0].id,
        rut: this.alumnodata[0].rut,
        nombre: this.alumnodata[0].nombre,
        apellido: this.alumnodata[0].apellido,
        email: this.alumnodata[0].email,
        password: this.alumnodata[0].password,
        isactive: this.alumnodata[0].isactive,
      };
      if (this.alumno.password !== password) {
        this.loginForm.reset();
        this.ErrorAlumno();
        return;
      }
      if (!this.alumno.isactive) {
        this.loginForm.reset();
        this.AlumnoInactivo();
        return;
      }
      this.IniciarSesion(this.alumno);
    });
  }

  private IniciarSesion(alumno: any) {
    sessionStorage.setItem("id", alumno.id);
    sessionStorage.setItem("rut", alumno.rut);
    sessionStorage.setItem("nombre", alumno.nombre);
    sessionStorage.setItem("apellido", alumno.apellido);
    sessionStorage.setItem("email", alumno.email);
    sessionStorage.setItem("password", alumno.password);
    this.showToast("Sesión Iniciada " + this.alumno.nombre);
    this.router.navigate(["/tabs/landing"]);
  }

  async showToast(msg: any) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }

  async AlumnoInactivo() {
    const alerta = await this.alertcontroller.create({
      header: "Alumno inactivo",
      message: "Comuníquese con soporte o su administrador.",
      buttons: ["OK"],
    });
    alerta.present();
  }

  async ErrorAlumno() {
    const alerta = await this.alertcontroller.create({
      header: "Error.",
      message: "Inténtelo nuevamente.",
      buttons: ["OK"],
    });
    alerta.present();
  }

  async AlumnoNoExiste() {
    const alerta = await this.alertcontroller.create({
      header: "Lo sentimos, este alumno no existe.",
      message: "Intente registrarse.",
      buttons: ["OK"],
    });
    alerta.present();
  }

  Registrar() {
    this.router.navigate(["registro"]);
  }
}
