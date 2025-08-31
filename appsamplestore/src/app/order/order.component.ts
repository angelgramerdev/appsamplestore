import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { OrderService } from '../order.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
      host: {
    'ngSkipHydration': 'true'
  }
})
export class OrderComponent implements OnInit {

 @Input() customerId !:number;
  auxOrders:any;
  page !:number;
  rows !:number;
  selectedValue:any;
  isOrderedByOrder !:boolean;
  isOrderedByRequiredDate !:boolean;
  isOrderedByShipedDate !:boolean;
  isOrderedByShipedName !:boolean
  isOrderedByShipedCity !:boolean;
  isOrderedByShipedAddress !:boolean;
  @Output() isModalOpenChanged = new EventEmitter<boolean>();
  
  constructor(private activatedRoute: ActivatedRoute, private service:OrderService)
  {
    setTimeout(() => {}, 10_000)

        this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => {
        this.customerId = parseInt(parametros.get("customerId")!);
    })
    
  }

  ngOnInit(): void
  {
    console.log(this.customerId);
    this.page=1;
    this.selectedValue=10;
    this.isOrderedByOrder=true;
    this.isOrderedByRequiredDate=true;
    this.isOrderedByShipedDate=true;
    this.isOrderedByShipedName=true;
    this.isOrderedByShipedCity=true;
    this.isOrderedByShipedAddress=true;
    this.getOrders(this.customerId)
  }

getOrders(customerId:number)
{
  this.rows=this.selectedValue;
  this.service.getOrders(customerId, this.page, this.rows).subscribe(res=> {
    this.auxOrders=res;
  });
}

decreasePage()
{
  this.page=this.page-1;
  this.getOrders(this.customerId);
}

encreasePage()
{
  this.page=this.page+1;
  this.getOrders(this.customerId);
}

quantityRows(e:any)
{
  this.rows=e;
  this.getOrders(this.customerId);
}

closeModal()
{
  this.isModalOpenChanged.emit(false);
}


orderByOrderId()
{
  if(this.isOrderedByOrder)
    {
        const sortedCopy = [...this.auxOrders.orders].
        sort((a, b) => a.orderId.localeCompare(b.orderId));
        this.auxOrders.orders=sortedCopy;
        this.isOrderedByOrder=false;
    }
    else
      {
        const sortedCopy = [...this.auxOrders.orders].
        sort((a, b) => b.orderId.localeCompare(a.orderId));
        this.auxOrders.orders=sortedCopy;
        this.isOrderedByOrder=true;
      }

}

orderedByRequiredDate()
{
    if(this.isOrderedByRequiredDate)
    {
        const sortedCopy = [...this.auxOrders.orders].
        sort((a, b) => a.requiredDate.localeCompare(b.requiredDate));
        this.auxOrders.orders=sortedCopy;
        this.isOrderedByRequiredDate=false;
    }
    else
      {
        const sortedCopy = [...this.auxOrders.orders].
        sort((a, b) => b.requiredDate.localeCompare(a.requiredDate));
        this.auxOrders.orders=sortedCopy;
        this.isOrderedByRequiredDate=true;
      }
}

OrderedByShippedDate()
{
      if(this.isOrderedByShipedDate)
    {
        const sortedCopy = [...this.auxOrders.orders].
        sort((a, b) => a.shippedDate.localeCompare(b.shippedDate));
        this.auxOrders.orders=sortedCopy;
        this.isOrderedByShipedDate=false;
    }
    else
      {
        const sortedCopy = [...this.auxOrders.orders].
        sort((a, b) => b.shippedDate.localeCompare(a.shippedDate));
        this.auxOrders.orders=sortedCopy;
        this.isOrderedByShipedDate=true;
      }
}

orderedByShipedName()
{
    if(this.isOrderedByShipedName)
    {
        const sortedCopy = [...this.auxOrders.orders].
        sort((a, b) => a.shipName.localeCompare(b.shipName));
        this.auxOrders.orders=sortedCopy;
        this.isOrderedByShipedName=false;
    }
    else
      {
        const sortedCopy = [...this.auxOrders.orders].
        sort((a, b) => b.shipName.localeCompare(a.shipName));
        this.auxOrders.orders=sortedCopy;
        this.isOrderedByShipedName=true;
      }
}

orderedByShippedCity()
{
    if(this.isOrderedByShipedCity)
    {
        const sortedCopy = [...this.auxOrders.orders].
        sort((a, b) => a.shipCity.localeCompare(b.shipCity));
        this.auxOrders.orders=sortedCopy;
        this.isOrderedByShipedCity=false;
    }
    else
      {
        const sortedCopy = [...this.auxOrders.orders].
        sort((a, b) => b.shipCity.localeCompare(a.shipCity));
        this.auxOrders.orders=sortedCopy;
        this.isOrderedByShipedCity=true;
      }
}

orderedByShipedAddress()
{
      if(this.isOrderedByShipedAddress)
    {
        const sortedCopy = [...this.auxOrders.orders].
        sort((a, b) => a.shipAddress.localeCompare(b.shipAddress));
        this.auxOrders.orders=sortedCopy;
        this.isOrderedByShipedAddress=false;
    }
    else
      {
        const sortedCopy = [...this.auxOrders.orders].
        sort((a, b) => b.shipAddress.localeCompare(a.shipAddress));
        this.auxOrders.orders=sortedCopy;
        this.isOrderedByShipedAddress=true;
      }
}

}
