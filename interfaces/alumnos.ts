//petición get, put, delete
export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  rut: string;
  email: string;
  password: string;
  isactive: boolean;
}

//post
export interface InterfazAlumnos {
  nombre: string;
  apellido: string;
  rut: string;
  email: string;
  password: string;
  isactive: boolean;
}
