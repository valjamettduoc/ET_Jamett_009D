import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Alumno, InterfazAlumnos } from "../../interfaces/alumnos";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private httpclient: HttpClient) {}

  GetAllUsers(): Observable<Alumno[]> {
    return this.httpclient.get<Alumno[]>(`${environment.apiUrl}/alumnos`);
  }

  getUserByEmail(email: string) {
    return this.httpclient.get<Alumno>(
      `${environment.apiUrl}/alumnos/?email=${email}`
    );
  }

  PostAlumno(newAlumno: InterfazAlumnos): Observable<InterfazAlumnos> {
    return this.httpclient.post<InterfazAlumnos>(
      `${environment.apiUrl}/alumnos`,
      newAlumno
    );
  }

  GetUsuarioId(id: string): Observable<Alumno> {
    return this.httpclient.get<Alumno>(
      `${environment.apiUrl}/alumnos/?id=${id}`
    );
  }

  actualizarEstudiante(estudiante: any): Observable<Alumno> {
    return this.httpclient.put<Alumno>(
      `${environment.apiUrl}/alumnos/${estudiante.id}`,
      estudiante
    );
  }
}
