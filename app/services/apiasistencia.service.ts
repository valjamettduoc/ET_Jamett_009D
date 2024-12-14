import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { NewAsistencia, Asistencias } from "src/interfaces/asistencia";

@Injectable({
  providedIn: "root",
})
export class ApiasistenciaService {
  constructor(private httpClient: HttpClient) {}

  PostAsistencia(newAsistencia: NewAsistencia): Observable<NewAsistencia> {
    return this.httpClient.post<NewAsistencia>(
      `${environment.apiUrl}/asistencias`,
      newAsistencia
    );
  }

  getAsistencias(): Observable<Asistencias[]> {
    return this.httpClient.get<Asistencias[]>(
      `${environment.apiUrl}/asistencias`
    );
  }
}
