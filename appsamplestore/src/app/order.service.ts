import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) 
  {

  }

  getOrders(customerId:number, page:number,rows:number)
  {
    return this.http.get(environment.url+"/GetOrders?customerId="+customerId+"&page="+page+"&rows="+rows)
  }

}
