import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  Justificacion,
  NewJustificacion,
} from "src/interfaces/justificaciones";

@Injectable({
  providedIn: "root",
})
export class ApijustificacionesService {
  constructor(private httpclient: HttpClient) {}

  getJustificacion(): Observable<Justificacion[]> {
    return this.httpclient.get<Justificacion[]>(
      `${environment.apiUrl}/asignaturas`
    );
  }

  postJustificacion(
    newAsignatura: NewJustificacion
  ): Observable<NewJustificacion> {
    return this.httpclient.post<NewJustificacion>(
      `${environment.apiUrl}/asignaturas`,
      newAsignatura
    );
  }

  putJustificacion(asignatura: any): Observable<Justificacion> {
    return this.httpclient.put<Justificacion>(
      `${environment.apiUrl}/asignaturas/${asignatura.id}`,
      asignatura
    );
  }

  deleteJustificacion(asignatura: any): Observable<Justificacion> {
    return this.httpclient.delete<Justificacion>(
      `${environment.apiUrl}/asignaturas/${asignatura.id}`
    );
  }
}
