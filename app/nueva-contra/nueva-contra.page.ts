import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-nueva-contra",
  templateUrl: "./nueva-contra.page.html",
  styleUrls: ["./nueva-contra.page.scss"],
})
export class NuevaContraPage implements OnInit {
  usuarioForm: FormGroup;
  usuario = {
    id: 0,
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    password: "",
    isactive: true,
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private formBuilder: FormBuilder // Inyectar FormBuilder
  ) {
    this.usuarioForm = this.formBuilder.group({
      txtPass: ["", Validators.required], // Agregar el control para la nueva contraseña
    });
  }

  ngOnInit() {}

  getIdFromUrl() {
    let url = this.router.url;
    let arr = url.split("/", 3);
    let id = arr[2]; // Mantener como cadena
    return id; // Devuelve como string
  }

  ionViewWillEnter() {
    this.getUsuarioById(this.getIdFromUrl());
  }

  getUsuarioById(usuarioID: string) {
    this.authService.GetUsuarioId(usuarioID).subscribe((resp: any) => {
      console.log(resp);
      this.usuario = {
        id: resp[0].id,
        nombre: resp[0].nombre,
        apellido: resp[0].apellido,
        rut: resp[0].rut,
        email: resp[0].email,
        password: "",
        isactive: resp[0].isactive,
      };
    });
  }

  ActualizarContra() {
    this.authService.actualizarProfesor(this.usuario).subscribe(() => {
      this.mostrarMensaje();
      this.router.navigateByUrl("/inicio");
    });
  }

  async mostrarMensaje() {
    const alerta = await this.alertController.create({
      header: "Usuario Actualizado ",
      message: "Su contraseña a sido reestablecida",
      buttons: ["OK"],
    });
    alerta.present();
  }
}
