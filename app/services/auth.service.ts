import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Profesor, NewProfesor } from "src/interfaces/profesores";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private httpclient: HttpClient) {}

  GetAllUsers(): Observable<Profesor[]> {
    return this.httpclient.get<Profesor[]>(`${environment.apiUrl}/profesores`);
  }

  getUserByEmail(email: string) {
    return this.httpclient.get<Profesor>(
      `${environment.apiUrl}/profesores/?email=${email}`
    );
  }

  PostAlumno(newAlumno: NewProfesor): Observable<NewProfesor> {
    return this.httpclient.post<NewProfesor>(
      `${environment.apiUrl}/profesores`,
      newAlumno
    );
  }

  GetUsuarioId(id: string): Observable<Profesor> {
    return this.httpclient.get<Profesor>(
      `${environment.apiUrl}/profesores/?id=${id}`
    );
  }

  actualizarProfesor(profesor: any): Observable<Profesor> {
    return this.httpclient.put<Profesor>(
      `${environment.apiUrl}/profesores/${profesor.id}`,
      profesor
    );
  }
}
