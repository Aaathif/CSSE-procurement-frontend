import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

import { ToastrService, IndividualConfig } from 'ngx-toastr';

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
  submitted = false;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
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
          alert('Order details inserted successfully');
          this.showCustomToast();
          this.router.navigate(['/orders']);
        },
        error: (e) => console.error(e)
      });
  }

  showCustomToast() {
    const toastOptions: Partial<IndividualConfig> = {
      enableHtml: true,
      closeButton: true,
      tapToDismiss: false,
      timeOut: 5000,
      extendedTimeOut: 2000,
    };

    this.toastr.success(
      '<div style="background-color: #4caf50; color: #ffffff; padding: 10px 20px; border-radius: 5px; font-weight: bold;">This is a custom styled toast</div>',
      'Custom Toast',
      toastOptions
    );
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

}
