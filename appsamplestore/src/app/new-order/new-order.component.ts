import { Component, OnInit ,Output,Input, ElementRef,EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ShipperService } from '../shipper.service';
import { EmployeeService } from '../employee.service';
import { ProductService } from '../product.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css',
  host: {
    'ngSkipHydration': 'true'
  }
})
export class NewOrderComponent implements OnInit {

  employeeSelectedValue:any;
  shiperSelectedValue:any;
  productSelectedValue:any;
  auxEmployees !:any;
  auxShippers:any;
  auxProducts:any;
  @Output() isAuxModalOpenChanged = new EventEmitter<boolean>();
  shipName !:string
  shipAddress !:string;
  shipCity !:string;
  shipCountry !:string;
  orderDate:any;
  shippedDate:any;
  requiredDate:any;
  freight:any;
  unitPrice !:any;
  quantity:any;
  discount:any;
  @Input() customerId !:number;

  constructor(private shipperService:ShipperService, 
    private employeeService:EmployeeService, 
    private productService:ProductService,
    private orderService:OrderService,
    private element:ElementRef
  )
  {
    setTimeout(() => {}, 10_000)
    this.getEmployees();
    this.getShippers();
    this.getProducts();

  }

  ngOnInit(): void 
  {

  }
  
  closeModal()
  {
    this.isAuxModalOpenChanged.emit(false);
  }

  getEmployees()
  {
  
    this.auxEmployees=this.employeeService.getEmployees().subscribe(res=>{
      this.auxEmployees=res;
    });
    
  }

  getShippers()
  {
    this.shipperService.getShippers().subscribe(res=> {
      console.log(res)
      this.auxShippers=res;
    });
  }

  getProducts()
  {
    this.productService.getProducts().subscribe(res=> {
      this.auxProducts=res;
    });
  }

  saveOrderDetails()
  {
    debugger
    if((this.shippedDate==null || this.shippedDate==undefined) || (this.orderDate==null || this.orderDate==undefined)  || (this.requiredDate==null || this.requiredDate==undefined))
      {
        alert("You can not leave empty fields");
        return;
      }

      if(!this.shipName  || !this.shipAddress || !this.shipCity || !this.shipCountry) 
        {
          alert("You can not leave empty fields");
          return;
        }
      
      if(!this.freight || !this.quantity || !this.unitPrice)
        {
          alert("You can not leave empty fields");
          return;
        }
    
    let orderDetail=
    {
        
        CustomerId:this.customerId,
        EmployeeId:parseInt(this.employeeSelectedValue),
        ShiperId:parseInt(this.shiperSelectedValue),
        OrderDate:this.orderDate,
        RequiredDate:this.requiredDate,
        ShippedDate:this.shippedDate,
        Freight:parseInt(this.freight),
        ShipName:this.shipName,
        ShipAddress:this.shipAddress,
        ShipCity:this.shipCity,
        ShipCountry:this.shipCountry,
        ProductId:parseInt(this.productSelectedValue),
        UnitPrice:parseFloat(this.unitPrice),
        Qty:parseInt(this.quantity),
        Discount:parseFloat(this.discount)
    }


   this.orderService.saveOrderDetails(orderDetail).subscribe(res=>{
    console.log(res);
    if(res==-1)
        alert("Order saved successfuly");
    this.employeeSelectedValue=null;
    this.shiperSelectedValue=null;
    this.orderDate=null;
    this.requiredDate=null;
    this.shippedDate=null;
    this.freight=null;
    this.shipName="";
    this.shipAddress=""
    this.shipCity="";
    this.shipCountry="";
    this.productSelectedValue=null;
    this.unitPrice=null;
    this.quantity=null;
    this.discount=null;
   });
   
  }

}
