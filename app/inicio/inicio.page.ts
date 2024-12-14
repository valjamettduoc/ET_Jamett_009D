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
  profesordata: any;

  profesor = {
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
      this.profesordata = resp;
      console.log(this.profesordata);
      if (this.profesordata.length === 0) {
        this.loginForm.reset();
        this.ProfesorNoExiste();
        return;
      }

      this.profesor = {
        id: this.profesordata[0].id,
        rut: this.profesordata[0].rut,
        nombre: this.profesordata[0].nombre,
        apellido: this.profesordata[0].apellido,
        email: this.profesordata[0].email,
        password: this.profesordata[0].password,
        isactive: this.profesordata[0].isactive,
      };
      if (this.profesor.password !== password) {
        this.loginForm.reset();
        this.ErrorProfesor();
        return;
      }
      if (!this.profesor.isactive) {
        this.loginForm.reset();
        this.ProfesorInactivo();
        return;
      }
      this.IniciarSesion(this.profesor);
    });
  }

  private IniciarSesion(profesor: any) {
    sessionStorage.setItem("id", profesor.id);
    sessionStorage.setItem("rut", profesor.rut);
    sessionStorage.setItem("nombre", profesor.nombre);
    sessionStorage.setItem("apellido", profesor.apellido);
    sessionStorage.setItem("email", profesor.email);
    sessionStorage.setItem("password", profesor.password);
    this.showToast("Sesión Iniciada " + this.profesor.nombre);
    this.router.navigate(["/tabs/landing"]);
  }

  async showToast(msg: any) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }

  async ProfesorInactivo() {
    const alerta = await this.alertcontroller.create({
      header: "Profesor inactivo",
      message: "Comuníquese con soporte o su administrador.",
      buttons: ["OK"],
    });
    alerta.present();
  }

  async ErrorProfesor() {
    const alerta = await this.alertcontroller.create({
      header: "Error.",
      message: "Inténtelo nuevamente.",
      buttons: ["OK"],
    });
    alerta.present();
  }

  async ProfesorNoExiste() {
    const alerta = await this.alertcontroller.create({
      header: "Lo sentimos, este profesor no existe.",
      message: "Intente registrarse.",
      buttons: ["OK"],
    });
    alerta.present();
  }

  Registrar() {
    this.router.navigate(["registro"]);
  }

  RecuperarContra() {
    this.router.navigate(["olvidar-contra"]);
  }
}
