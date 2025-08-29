import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
      host: {
    'ngSkipHydration': 'true'
  }
})
export class OrderComponent {

  constructor()
  {
    setTimeout(() => {}, 10_000)
  }

}
