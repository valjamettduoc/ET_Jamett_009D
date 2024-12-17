import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NewAsistencia } from "src/interfaces/asistencia";
import { environment } from "src/environments/environment";
import { Asistencias } from "src/interfaces/asistencia";

@Injectable({
  providedIn: "root",
})
export class ApiasistenciaService {
  constructor(private http: HttpClient) {}

  saveQrData(newAsistencia: NewAsistencia): Observable<any> {
    const apiUrl = `${environment.apiUrl}/asistencia`;
    return this.http.post<any>(apiUrl, newAsistencia);
  }

  getAsistencias(): Observable<Asistencias[]> {
    return this.http.get<Asistencias[]>(`${environment.apiUrl}/asistencia`);
  }
}
