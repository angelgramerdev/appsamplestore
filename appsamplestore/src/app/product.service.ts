import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) 
  { 
  }

  getProducts()
  {
    return this.http.get(environment.url+"/GetProducts");
  }
}
