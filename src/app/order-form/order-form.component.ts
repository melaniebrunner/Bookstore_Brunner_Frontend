import { Component, OnInit } from '@angular/core';
import {OrderFactory} from "../shared/order-factory";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {BookStoreService} from "../shared/book-store.service";
import {Orderlog} from "../shared/orderlog";
import {OrderlogFactory} from "../shared/orderlog-factory";

@Component({
    selector: 'bs-order-form',
    templateUrl: './order-form.component.html',
    styles: []
})
export class OrderFormComponent implements OnInit {

    orderForm: FormGroup;
    order = OrderFactory.empty();

    constructor(private fb: FormBuilder, private bs: BookStoreService,
                private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        if (id) {

            this.bs.getSingleOrder(id).subscribe(order => {
                this.order = order;
                this.initOrder();
            });
        }
        this.initOrder();
    }

    initOrder() {
        //aus Datenstruktur von Formular Buchobjekt
        this.orderForm = this.fb.group({
            state: this.order.state,
            comment: "",
            comment_admin: "",
            order_id: this.order.id
        });
    }

    submitForm() {
        const orderlog: Orderlog = OrderlogFactory.fromObject(this.orderForm.value);
        console.log(orderlog);

        this.bs.updateOrder(orderlog).subscribe(res => {
            this.router.navigate(['../../../orders'], { relativeTo: this.route });
        });
    }
}
