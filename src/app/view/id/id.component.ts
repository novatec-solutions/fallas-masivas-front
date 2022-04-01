

    import { Component, OnInit } from '@angular/core';

    @Component({
      selector: 'app-id',
      templateUrl: './id.component.html',
      styleUrls: ['./id.component.scss']
    })
    export class IdComponent implements OnInit {

      tel: string | null = ""

      email: string | null = ""

      constructor() { }

      ngOnInit(): void {

        if(localStorage.getItem('tel')){

          this.tel = localStorage.getItem('tel')

        }

        if(localStorage.getItem('email')){

          this.email = localStorage.getItem('email')

        }

      }

      switchChange(data: string | null){
        console.log(data)
      }

    }
