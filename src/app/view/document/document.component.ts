

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import switchData from './data/switchData.json';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})

export class DocumentComponent implements OnInit {

  datosUsuario: any[] = []

  constructor(

    private formBuilder: FormBuilder,

    private router: Router,

  ) { }


  ngOnInit(): void {

    this.datosUsuario = switchData;

  }

  form = this.formBuilder.group({

    tipo_cedula: ['', Validators.required],

    cedula: ['', Validators.required]

  })

  saveData() {
    this.datosUsuario = JSON.parse(JSON.stringify(this.datosUsuario))

    let documentoExistente: boolean = false;

    let email: any;

    let telefonos: any;

    for (let index = 0; index < this.datosUsuario.length; index++) {
      console.log(this.datosUsuario[index].documento)
      console.log(this.datosUsuario.length)
      console.log(this.datosUsuario[0])

      if (this.datosUsuario[index].documento === this.form.controls['cedula'].value) {

        documentoExistente = true;

        email = this.datosUsuario[index].email;

        telefonos = this.datosUsuario[index].telefono;

        break;

      }

    }

    if(documentoExistente){

      localStorage.setItem('tel', telefonos)
      localStorage.setItem('email', email)

      this.router.navigate(['/validate']);

    } else {

      Swal.fire({

        html: '<p class="venta"> El número de Cedula indicado no <br> se encuentra en el sistema, <BR> verifíquelo e intente de nuevo </p>',

        showCancelButton: true,
        confirmButtonColor: '#D8291D',
        confirmButtonText: 'Intentar nuevamente',
        width: "30%",
        heightAuto: false,
        cancelButtonText: `Cancelar`,
        cancelButtonColor: '#606060',
        reverseButtons: true,
        customClass: {
          cancelButton: 'cancel',
          popup: 'caja'

        },



      }).then((result) => {

        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          this.form.reset();

        }

      })

    }
  }
    // Swal.fire({

    //   title: `Desea continuar con ${this.form.controls.cedula.value}?`,

    //   showDenyButton: true,

    //   showCancelButton: false,

    //   confirmButtonText: 'Si',

    //   denyButtonText: `no`,

    //   reverseButtons: true,

    // }).then((result) => {
    //   console.log(result)
    //   /* Read more about isConfirmed, isDenied below */

    //   if (result.isConfirmed) {

    //     //aqui es donde se ejecutara el servicio y el suscribe para saber que accion realizar

    //     if (this.form.controls.cedula.value == this.datosUsuario[0].documento) {

    //       this.router.navigate(['/paso2']);

    //     } else {

    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         html:
    //           '<p>Al parecer ese no° de cedula no se encuentra en el sistema!</p>' +
    //           '<p>Compruebe que los datos esten correctamente escritos incluyendo mayusculas y minusculas</p> ',
    //         footer: '<a href="">Por que tengo este error?</a>'
    //       })

    //     }

    //   } else if (result.isDenied) {

    //     Swal.fire('Cancelado', '', 'info')

    //   }

    // })
  }

