import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Asignaturas, Asignatura, IAlumno } from "src/interfaces/asignaturas";

@Injectable({
  providedIn: "root",
})
export class ApiasignaturasService {
  apiPost = "http://localhost:3000/asignaturas";

  constructor(private httpclient: HttpClient) {}

  /*método get de consumo de api pública*/
  getPosts(): Observable<any> {
    return this.httpclient.get<any>(this.apiPost);
  }

  getAsignatura(): Observable<Asignaturas[]> {
    return this.httpclient.get<Asignaturas[]>(
      `${environment.apiUrl}/asignaturas`
    );
  }

  postAsignatura(newAsignatura: Asignatura): Observable<Asignatura> {
    return this.httpclient.post<Asignatura>(
      `${environment.apiUrl}/asignaturas`,
      newAsignatura
    );
  }

  putAsignatura(asignatura: any): Observable<Asignaturas> {
    return this.httpclient.put<Asignaturas>(
      `${environment.apiUrl}/asignaturas/${asignatura.id}`,
      asignatura
    );
  }

  deleteAsignatura(asignatura: any): Observable<Asignaturas> {
    return this.httpclient.delete<Asignaturas>(
      `${environment.apiUrl}/asignaturas/${asignatura.id}`
    );
  }

  getAlumnos(): Observable<IAlumno[]> {
    return this.httpclient.get<IAlumno[]>(`${environment.apiUrl}/usuarios`);
  }
}
