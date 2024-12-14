import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, switchMap } from "rxjs";
import { Alumno, InterfazAlumnos } from "../../interfaces/alumnos";
import { QRgenerado } from "../../interfaces/qrgenerado";
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

  // New method to update QR data for a student
  updateQRForAlumno(rut: string, nuevoQR: QRgenerado): Observable<Alumno> {
    return this.httpclient
      .get<Alumno[]>(`${environment.apiUrl}/alumnos/?rut=${rut}`)
      .pipe(
        map((alumnos) => {
          if (alumnos.length > 0) {
            const alumno = alumnos[0];
            // Initialize the qrgenerado array if it's undefined
            if (!alumno.qrgenerado) {
              alumno.qrgenerado = [];
            }
            // Add the new QR data to the array
            alumno.qrgenerado.push(nuevoQR);

            // Return the updated student object
            return alumno;
          } else {
            throw new Error("Alumno no encontrado");
          }
        }),
        switchMap((alumno) =>
          this.httpclient.put<Alumno>(
            `${environment.apiUrl}/alumnos/${alumno.id}`,
            alumno
          )
        )
      );
  }
}
