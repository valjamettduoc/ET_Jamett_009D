//get, put, delete
export interface Justificacion {
  id: number;
  asignatura: string;
  seccion: string;
  imagen: string;
  alumno: string;
  profesor: string;
  descripcion: string;
}

//post
export interface NewJustificacion {
  asignataura: string;
  seccion: string;
  imagen: string;
  profesor: string;
  alumno: string;
  descripcion: string;
}
