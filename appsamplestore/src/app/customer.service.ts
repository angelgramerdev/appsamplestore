import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) 
  { 

  }

  getCustomers(pages:number,rows:number)
  {
   return this.http.get(environment.url+"/GetCustomers?pages="+pages+"&rows="+rows);
  }

  searchByName(name:string)
  {
    return this.http.get(environment.url+"/GetCustomerByName?name="+name);
  }

}
