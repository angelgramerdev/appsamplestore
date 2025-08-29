import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) 
  { 

  }

  getCustomers(pages:number,rows:number)
  {
   return this.http.get(environment.url+"?pages="+pages+"&rows="+rows);
  }

}
