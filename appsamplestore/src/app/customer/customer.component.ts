import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
    host: {
    'ngSkipHydration': 'true'
  }
})
export class CustomerComponent implements OnInit {


  constructor(private service:CustomerService)
  {
    setTimeout(() => {}, 10_000)
  }

  customers:any;
  pages !:number;
  rows !:number;

ngOnInit(): void 
{
  this.pages=1;
  this.rows=20;
  this.getCustomers();
}

getCustomers()
{
  debugger
  this.customers=this.service.getCustomers(this.pages,this.rows).subscribe(res=> {
    debugger
    console.log(res);
    this.customers=res;
    
  });
}

getOrders(idcustomer:number)
{

}

createOrder()
{
  
}

}
