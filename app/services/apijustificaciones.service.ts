import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  NewJustificacion,
  Justificacion,
} from "src/interfaces/justificaciones";

@Injectable({
  providedIn: "root",
})
export class ApijustificacionesService {
  constructor(private httpclient: HttpClient) {}

  // Obtener todas las justificaciones
  getJustificaciones(): Observable<Justificacion[]> {
    return this.httpclient.get<Justificacion[]>(
      `${environment.apiUrl}/justificaciones`
    );
  }

  // Crear una nueva justificación
  postJustificacion(
    newJustificacion: NewJustificacion
  ): Observable<NewJustificacion> {
    return this.httpclient.post<NewJustificacion>(
      `${environment.apiUrl}/justificaciones`,
      newJustificacion
    );
  }

  // Obtener una justificación específica por su ID o algún atributo único
  getJustificacionById(id: string): Observable<Justificacion> {
    return this.httpclient.get<Justificacion>(
      `${environment.apiUrl}/justificaciones/${id}`
    );
  }

  // Actualizar una justificación existente
  putJustificacion(justificacion: Justificacion): Observable<Justificacion> {
    return this.httpclient.put<Justificacion>(
      `${environment.apiUrl}/justificaciones/${justificacion.id}`,
      justificacion
    );
  }

  // Eliminar una justificación existente
  deleteJustificacion(id: string): Observable<Justificacion> {
    return this.httpclient.delete<Justificacion>(
      `${environment.apiUrl}/justificaciones/${id}`
    );
  }
}
