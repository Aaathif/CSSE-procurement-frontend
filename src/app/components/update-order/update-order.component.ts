import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {

  @Input() ViewMode = false;

  @Input() currentOrder : Order = {
    date: '',
    address: '',
    supplierDetails: '',
    companyDetails: '',
    qty: ''
  }

  message = '';

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.ViewMode){
      this.message = '';
    }
    // this.route.queryParams.subscribe(params => {
    //   this.currentOrder = params;
    // });
  }

  getOrder(id: string): void {
    this.orderService.get(id)
      .subscribe({
        next: (data) => {
          this.currentOrder = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateOrder(): void {
    this.message = '';

    this.orderService.update(this.currentOrder.orderId, this.currentOrder)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Order was updated successfully!';
          alert('Order details updated successfully');
          this.router.navigate(['/orders']);
        },
        error: (e) => console.error(e)
      });
  }

  deleteOrder(): void {
    this.orderService.delete(this.currentOrder.orderId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/orders']);
        },
        error: (e) => console.error(e)
      });
  }

}
