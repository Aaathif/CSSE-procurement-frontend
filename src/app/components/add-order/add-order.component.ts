import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

import { NgToastService } from 'ng-angular-popup';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  order: Order = {
    orderId: '',
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

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
  }


  saveOrder(): void {
    const data = {
      id: this.order.orderId,
      date: this.order.date,
      address: this.order.address,
      supplierDetails: this.order.supplierDetails,
      companyDetails: this.order.companyDetails,
      qty: this.order.qty,
    };

    this.orderService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          // alert('Order details inserted successfully');
          this.toast.success({detail: "Success Message!", summary: "Added Successfully", duration: 5000})
          this.router.navigate(['/orders']);
        },
        error: (e) => {
          console.error(e)
          this.toast.error({detail: "Failed Message!", summary: "Adding Error Happened", duration: 5000})
        }
        
      });
  }


  newOrder(): void {
    this.submitted = false;
    this.order = {
      date: '',
      address: '',
      supplierDetails: '',
      companyDetails: '',
      qty: '',
    };
  }

  onSubmit(): void {
    console.log(JSON.stringify(this.form, null, 2));
    this.saveOrder()
  }

  onReset(form: NgForm): void {
    form.reset();
  }

}
