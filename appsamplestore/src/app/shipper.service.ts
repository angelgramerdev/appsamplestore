import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ShipperService {

  constructor(private http:HttpClient) 
  { 

  }

  getShippers()
  {
    return this.http.get(environment.url+"/GetShippers");
  }

}
