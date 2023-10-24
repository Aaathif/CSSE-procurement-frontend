import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders?: Order[];
  currentOrder: Order = {};
  currentIndex = -1;



  constructor(private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    this.retrieveOrders();
  }

  retrieveOrders(): void {
    this.orderService.getAll()
      .subscribe({
        next: (data) => {
          this.orders = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveOrders();
    this.currentOrder = {};
    this.currentIndex = -1;
  }

  setActiveOrder(order: Order, index: number): void {
    this.currentOrder = order;
    this.currentIndex = index;
  }

  removeAllOrders(): void {
    this.orderService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  removeOrder(orderId: any): void {
    this.orderService.delete(orderId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
          alert('Order details removed successfully');
        },
        error: (e) => console.error(e)
      });
  }

  updateOrder(orderId: any) {
    this.router.navigate([`/orders/update/${orderId}`], { queryParams: this.currentOrder });
  }

}
