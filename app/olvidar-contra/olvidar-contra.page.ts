import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AlertController, ToastController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-olvidar-contra",
  templateUrl: "./olvidar-contra.page.html",
  styleUrls: ["./olvidar-contra.page.scss"],
})
export class OlvidarContraPage implements OnInit {
  userdata: any;
  emailForm: FormGroup;
  alumnodata = {
    id: 0,
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    password: "",
    isactive: true,
  };

  constructor(
    private authservice: AuthService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private builder: FormBuilder
  ) {
    this.emailForm = this.builder.group({
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(4), // Agregamos el validador de email
      ]),
    });
  }

  checkmail() {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;

      this.authservice.getUserByEmail(email).subscribe((resp) => {
        this.userdata = resp; // Asignamos la respuesta del servicio a userdata
        console.log(this.userdata);

        if (this.userdata && this.userdata.length > 0) {
          // Usuario encontrado
          this.alumnodata = {
            id: this.userdata[0].id,
            nombre: this.userdata[0].nombre,
            apellido: this.userdata[0].apellido,
            rut: this.userdata[0].rut,
            email: this.userdata[0].email,
            password: this.userdata[0].password,
            isactive: this.userdata[0].isactive,
          };

          // Redirigir a la página de nueva contraseña con el ID del usuario
          this.router.navigate(["/nueva-contra", this.alumnodata.id]);
        } else {
          // Usuario no encontrado
          this.NoExiste();
          this.emailForm.reset();
        }
      });
    } else {
      // Formulario inválido, podría mostrar un mensaje de validación aquí si es necesario
      this.showToast("Por favor ingresa un correo válido.");
    }
  }

  async showToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }

  async UserInactivo() {
    const alerta = await this.alertController.create({
      header: "Usuario inactivo",
      message: "Contactar a admin@admin.cl",
      buttons: ["OK"],
    });
    alerta.present();
  }

  async Error() {
    const alerta = await this.alertController.create({
      header: "Error",
      message: "Revise sus credenciales",
      buttons: ["OK"],
    });
    alerta.present();
  }

  async NoExiste() {
    const alerta = await this.alertController.create({
      header: "No existe",
      message: "No hay correo vinculado",
      buttons: ["OK"],
    });
    alerta.present();
  }
  ngOnInit() {}
}
