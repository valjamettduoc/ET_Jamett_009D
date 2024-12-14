import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asignaturas, Asignatura} from 'src/interfaces/asignaturas';

@Injectable({
  providedIn: 'root'
})
export class ApicrudService {

  constructor(private httpclient: HttpClient) { }

  getAsignaturas():Observable<Asignaturas[]>{
    return this.httpclient.get<Asignaturas[]>(`${environment.apiUrl}/asignaturas`);
  }

  postAsignaturas(newAsignatura: Asignatura):Observable<Asignatura>{
    return this.httpclient.post<Asignatura>(`${environment.apiUrl}/asignaturas`, newAsignatura);
  }

  get(nombreasignatura: string):Observable<Asignaturas>{
    return this.httpclient.get<Asignaturas>(`${environment.apiUrl}/asignaturas/?nombreasignatura=${nombreasignatura}`);
  }

  putAsignaturas(asignatura: any):Observable<Asignaturas>{
    return this.httpclient.put<Asignaturas>(`${environment.apiUrl}/asignaturas/${asignatura.nombreasignatura}`, asignatura);
  }

  deleteAsignaturas(asignatura: any):Observable<Asignaturas>{
    return this.httpclient.delete<Asignaturas>(`${environment.apiUrl}/asignaturas/${asignatura.nombreasignatura}`);
  }
  
}
