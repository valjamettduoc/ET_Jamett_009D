import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Justificacion } from "src/interfaces/justificaciones"; // Importa la interfaz adecuada
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApijustificacionesService {
  constructor(private httpclient: HttpClient) {}

  // Obtener todas las justificaciones
  GetAllJustificaciones(): Observable<Justificacion[]> {
    return this.httpclient.get<Justificacion[]>(
      `${environment.apiUrl}/justificaciones`
    );
  }

  // Obtener una justificación por su ID
  GetJustificacionById(id: string): Observable<Justificacion> {
    return this.httpclient.get<Justificacion>(
      `${environment.apiUrl}/justificaciones/${id}`
    );
  }

  // Crear una nueva justificación
  PostJustificacion(
    newJustificacion: Justificacion
  ): Observable<Justificacion> {
    return this.httpclient.post<Justificacion>(
      `${environment.apiUrl}/justificaciones`,
      newJustificacion
    );
  }

  // Actualizar una justificación existente
  actualizarJustificacion(
    justificacion: Justificacion
  ): Observable<Justificacion> {
    return this.httpclient.put<Justificacion>(
      `${environment.apiUrl}/justificaciones/${justificacion.id}`,
      justificacion
    );
  }

  // Eliminar una justificación
  eliminarJustificacion(id: string): Observable<void> {
    return this.httpclient.delete<void>(
      `${environment.apiUrl}/justificaciones/${id}`
    );
  }
}
