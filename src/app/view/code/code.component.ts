import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})


export class CodeComponent implements OnInit {

  datosUsuario: any[] = []

  constructor(

    private formBuilder: FormBuilder,

    private router: Router,

  ) { }


  ngOnInit(): void {


  }

  form = this.formBuilder.group({


   pin1: ['', Validators.required],
   pin2: ['', Validators.required],
   pin3: ['', Validators.required],
   pin4: ['', Validators.required]




  })

  saveData() {
    console.log("boton",this.form.value.pin1);
    this.datosUsuario = JSON.parse(JSON.stringify(this.datosUsuario))

    let documentoExistente: boolean = false;


    for (let index = 0; index < this.datosUsuario.length; index++) {
      console.log(this.datosUsuario[index].documento)
      console.log(this.datosUsuario.length)
      console.log(this.datosUsuario[0])

      if (this.datosUsuario[index].documento === this.form.controls['cedula'].value) {

        documentoExistente = true;



        break;

      }

    }

    if(documentoExistente){


      this.router.navigate(['/validate']);

    } else {

      Swal.fire({

        html: '<p class="venta"> Señor Usuario el Código que ingreso <br> ha superado el tiempo máximo de <br> activación </p>',

        showCancelButton: true,
        confirmButtonColor: '#D8291D',
        confirmButtonText: 'Finalizar',

        width: "30%",
        heightAuto: false,
        cancelButtonText: `Generar código`,
        cancelButtonColor: '#D8291D',
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

