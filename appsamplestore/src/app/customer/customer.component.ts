import { Component, OnInit, ElementRef, Renderer2  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CustomerService } from '../customer.service';
import { OrderComponent } from '../order/order.component';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [OrderComponent, FormsModule, DatePipe],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
    host: {
    'ngSkipHydration': 'true'
  }
})
export class CustomerComponent implements OnInit {


  constructor(private service:CustomerService, 
    private element:ElementRef, private render:Renderer2)
  {
    setTimeout(() => {}, 10_000)

  }

  auxCustomers:any;
  pages !:number;
  rows !:number;
  auxRows !:number
  isOrderedByName !:boolean;
  isOrderedByLastOrderDate !:boolean;
  isOrderedByPredictedDate !:boolean;
  isModalOpen !:boolean;
  customerId !:number;
  selectedValue:any;
  inputName !:string;

ngOnInit(): void 
{
  this.pages=1;
  this.rows=20;
  this.isOrderedByName=true;
  this.isOrderedByLastOrderDate=true;
  this.isOrderedByPredictedDate=true;
  this.isModalOpen=false;
  this.selectedValue=10;

      const elemento = this.element.nativeElement.querySelector('.form-control');
      if (elemento) {
        this.render.removeClass(elemento, 'form-control');
      }
    debugger
  
  this.getCustomers();
}

getCustomers()
{
  this.rows=this.selectedValue;
  this.auxCustomers=this.service.getCustomers(this.pages,this.rows).subscribe(res=> {
    this.auxCustomers=res;
  });
}

orderByCustomerName()
{
  debugger
  if(this.isOrderedByName)
    {
        const sortedCopy = [...this.auxCustomers.customers].
        sort((a, b) => a.customerName.localeCompare(b.customerName));
        this.auxCustomers.customers=sortedCopy;
        this.isOrderedByName=false;
    }
    else
      {
        const sortedCopy = [...this.auxCustomers.customers].
        sort((a, b) => b.customerName.localeCompare(a.customerName));
        this.auxCustomers.customers=sortedCopy;
        this.isOrderedByName=true;
      }

}

orderByLastOrderDate()
{
  if(this.isOrderedByLastOrderDate)
    {
        const sortedCopy = [...this.auxCustomers.customers].
        sort((a, b) => a.lastOrderDate.localeCompare(b.lastOrderDate));
        this.auxCustomers.customers=sortedCopy;
        this.isOrderedByLastOrderDate=false;
    }
    else
      {
        const sortedCopy = [...this.auxCustomers.customers].
        sort((a, b) => b.lastOrderDate.localeCompare(a.lastOrderDate));
        this.auxCustomers.customers=sortedCopy;
        this.isOrderedByLastOrderDate=true;
      }

}

orderByPredictedDate()
{
  if(this.isOrderedByPredictedDate)
    {
        const sortedCopy = [...this.auxCustomers.customers].
        sort((a, b) => a.predictedDate.localeCompare(b.predictedDate));
        this.auxCustomers.customers=sortedCopy;
        this.isOrderedByPredictedDate=false;
    }
    else
      {
        const sortedCopy = [...this.auxCustomers.customers].
        sort((a, b) => b.predictedDate.localeCompare(a.predictedDate));
        this.auxCustomers.customers=sortedCopy;
        this.isOrderedByPredictedDate=true;
      }

}

quantityRows(e:any)
{

  this.rows=parseInt(e);
  this.getCustomers();
}

  encreasePage()
  {
  this.pages=this.pages+1;
  this.getCustomers();
  }

  decreasePage()
  {
    this.pages=this.pages-1;
    this.getCustomers();
  }

  openModal(customerId:number)
  {
    debugger
    this.customerId=customerId;
    if(!this.isModalOpen)
      {
        this.isModalOpen=true;
      }
      else
        {
          this.isModalOpen=false;
        }  
  }

  closeModal(isModalClosed:boolean)
  {
    this.isModalOpen=isModalClosed;
  }

  changeInput(e:any)
  {
    debugger
    console.log(e);
    this.inputName=e.value;
  }

  searchByName()
  {
    debugger
    if(this.inputName.length <= 0)
        return;
        
    this.service.searchByName(this.inputName).subscribe(res=> {
      this.auxCustomers=res;
    });

  }

}
