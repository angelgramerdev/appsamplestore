import { Routes } from '@angular/router';
import { CustomerComponent } from '../app/customer/customer.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
    {path:'customers', component:CustomerComponent},
    {path:'orders', component:OrderComponent}
];
