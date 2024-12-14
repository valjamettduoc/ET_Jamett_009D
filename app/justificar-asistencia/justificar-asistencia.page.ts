import { Component, OnInit } from "@angular/core";

type Asignatura =
  | "Arquitectura de Software"
  | "Estadística Descriptiva"
  | "Ética Profesional"
  | "Programación de Aplicaciones Móviles";

@Component({
  selector: "app-justificar-asistencia",
  templateUrl: "./justificar-asistencia.page.html",
  styleUrls: ["./justificar-asistencia.page.scss"],
})
export class JustificarAsistenciaPage implements OnInit {
  justificacion = {
    nombre: "",
    rut: "",
    justificativo: "",
    profesor: "",
    asignatura: "" as Asignatura, // Definimos el tipo de asignatura
    documento: null,
  };

  asignaturas: Asignatura[] = [
    "Arquitectura de Software",
    "Estadística Descriptiva",
    "Ética Profesional",
    "Programación de Aplicaciones Móviles",
  ];

  profesores: { [key in Asignatura]: string } = {
    // Mapeo de profesores
    "Arquitectura de Software": "Cristian Lazcano",
    "Estadística Descriptiva": "Carla Manziya",
    "Ética Profesional": "Divia Alarcon",
    "Programación de Aplicaciones Móviles": "Viviana Poblete",
  };

  justificacionesGuardadas: any[] = [];

  constructor() {
    // Aquí deberías cargar los datos del estudiante según tu lógica de autenticación
    this.justificacion.nombre = "Nombre del Estudiante";
    this.justificacion.rut = "12345678-9";
  }

  ngOnInit(): void {
    this.cargarJustificaciones();
  }

  onAsignaturaChange() {
    // Asegúrate de que asignatura es del tipo Asignatura antes de asignar el profesor
    if (
      this.asignaturas.includes(this.justificacion.asignatura as Asignatura)
    ) {
      this.justificacion.profesor =
        this.profesores[this.justificacion.asignatura] || "";
    } else {
      this.justificacion.profesor = ""; // Resetear si la asignatura no es válida
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.justificacion.documento = file;
  }

  onSubmit() {
    const nuevaJustificacion = {
      ...this.justificacion,
      fecha: new Date().toISOString(),
    };
    this.justificacionesGuardadas.push(nuevaJustificacion);
    this.guardarJustificaciones();
    console.log("Justificación guardada:", nuevaJustificacion);
    alert("Justificación enviada con éxito");
  }

  guardarJustificaciones() {
    localStorage.setItem(
      "justificaciones",
      JSON.stringify(this.justificacionesGuardadas)
    );
  }

  cargarJustificaciones() {
    const justificaciones = localStorage.getItem("justificaciones");
    this.justificacionesGuardadas = justificaciones
      ? JSON.parse(justificaciones)
      : [];
  }
}
