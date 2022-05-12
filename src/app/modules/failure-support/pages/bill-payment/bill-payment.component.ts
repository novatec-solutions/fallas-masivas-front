import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-payment',
  templateUrl: './bill-payment.component.html',
  styleUrls: ['./bill-payment.component.scss']
})
export class BillPaymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  portalpagos(){
    window.location.href='https://portalpagos.claro.com.co/';
  }

}
