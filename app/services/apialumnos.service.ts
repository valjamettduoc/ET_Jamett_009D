import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApialumnosService {

  apiUrl='http://localhost:3000/alumnos';

  constructor(private httpclient: HttpClient) { }

  getUsers():Observable<any>{
    return this.httpclient.get<any>(this.apiUrl);
  }

}
