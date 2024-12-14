//get, put, delete
export interface Profesor {
  id: number;
  nombre: string;
  apellido: string;
  rut: string;
  email: string;
  password: string;
  isactive: boolean;
}
//post
export interface NewProfesor {
  nombre: string;
  apellido: string;
  rut: string;
  email: string;
  password: string;
  isactive: boolean;
}
