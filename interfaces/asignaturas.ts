//petición get, put, delete
export interface Asignaturas {
  id: number;
  nombre: string;
  profesor: string;
}

//petición post
export interface Asignatura {
  nombre: string;
  profesor: string;
}

export interface IAlumno {
  id: number;
  nombre: string;
  email: string;
  rut: string;
}
