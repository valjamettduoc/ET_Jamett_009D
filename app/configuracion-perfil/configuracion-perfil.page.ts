import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-configuracion-perfil",
  templateUrl: "./configuracion-perfil.page.html",
  styleUrls: ["./configuracion-perfil.page.scss"],
})
export class ConfiguracionPerfilPage implements OnInit {
  imageSrc: string | ArrayBuffer | null = null;

  unAlumnos = {
    id: "",
    rut: "",
    nombre: "",
    apellido: "",
    password: "",
    email: "",
    isactive: "",
  };

  id: string | null = sessionStorage.getItem("id");

  constructor(
    private router: Router,
    private apicrudservice: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.imageSrc = localStorage.getItem("photo");
  }

  ionViewWillEnter() {
    this.getEstudianteById(this.getIdFromSession());
  }

  getIdFromSession() {
    let id = this.id;

    if (id !== null) {
      return id; // Ya es string porque viene de sessionStorage
    } else {
      // En caso de que id sea null, registra un error
      console.error("El valor de id en sessionStorage es nulo.");
      return ""; // Devuelve un string vacío en lugar de -1
    }
  }

  getEstudianteById(estudianteID: string) {
    this.apicrudservice.GetUsuarioId(estudianteID).subscribe((resp: any) => {
      this.unAlumnos = {
        id: resp[0].id,
        nombre: resp[0].nombre,
        apellido: resp[0].apellido,
        rut: resp[0].rut,
        email: resp[0].email,
        password: resp[0].password,
        isactive: resp[0].isactive,
      };
    });
  }

  ActualizarEstudiante() {
    this.apicrudservice.actualizarEstudiante(this.unAlumnos).subscribe();
    sessionStorage.clear();
    this.router.navigate(["/inicio"], {
      state: { imageSrc: this.imageSrc },
    });
    this.mostrarMensaje();
  }

  async mostrarMensaje() {
    const aleta = await this.alertController.create({
      header: "Datos Actualizados",
      message: "Su información se ha modificado, inicie sesión nuevamente",
      buttons: ["OK"],
    });
    aleta.present();
    return;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result; // Imagen Vista
        // Almacenar la imagen en localStorage
        localStorage.setItem("photo", this.imageSrc as string);
      };
      reader.readAsDataURL(file);
    }
  }

  actualizarPerfil() {
    this.router.navigate(["/tabs/view-user"], {
      state: { imageSrc: this.imageSrc },
    });
  }
}
