import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

import { NgToastService } from 'ng-angular-popup';
import { NgForm } from '@angular/forms';

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

  form = {
    orderId: '',
    date: '',
    address: '',
    supplierDetails: '',
    companyDetails: '',
    qty: ''
  }

  submitted = false;

  message = '';

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: NgToastService
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
          // alert('Order details updated successfully');
          this.submitted = true;
          this.toast.success({detail: "Success Message!", summary: "Updated Successfully", duration: 5000})
          this.router.navigate(['/orders']);
        },
        error: (e) => {
          console.error(e)
          this.toast.error({detail: "Failed Message!", summary: "Updating Error Happened", duration: 5000})
        }
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

  onSubmit(): void {
    console.log(JSON.stringify(this.form, null, 2));
    this.updateOrder()
  }

  onReset(form: NgForm): void {
    form.reset();
  }


}
