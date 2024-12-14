//get, put, delete
export interface Justificacion {
  id: number;
  asignataura: string;
  profesor: string;
  fecha: Date;
  descripcion: string;
}

//post
export interface NewJustificacion {
  asignataura: string;
  profesor: string;
  fecha: Date;
  descripcion: string;
}
