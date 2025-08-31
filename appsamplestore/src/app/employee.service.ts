import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/enviroment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) 
  { 

  }

  getEmployees():Observable<any>
  {
    return this.http.get(environment.url+"/GetEmployees");
  }
}
