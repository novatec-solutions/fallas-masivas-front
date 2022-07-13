import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessagesComponent } from 'src/app/core/organisms/messages/messages.component';
import { SupportService } from '../../services/support.service';

@Component({
  selector: 'app-activate-package',
  templateUrl: './activate-package.component.html',
  styleUrls: ['./activate-package.component.scss']
})
export class ActivatePackageComponent implements OnInit {
  validateForm!: FormGroup;
  dialogRef: any;
  access: boolean = false;
  pageType = 0;
  cellPhone!: string ;

  constructor(public fb: FormBuilder,
    public dialog: MatDialog,
    private SupportService: SupportService,
    private router: Router) {
    this.validateForm = this.fb.group({
      cellPhone: ['', [Validators.required]],
      terms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
  }

  activateDataPackage(){
    this.cellPhone = this.validateForm.value.cellPhone;
    const regex = new RegExp(/^3{1}\d{9}$/);
    if(!regex.test(this.cellPhone)){
      const data = {
        icon: "x-circle",
        title: "¡Oops, algo salió mal!",
        text: "El número que ingresaste no es válido, revisa que no tenga espacio, ni signos de puntuación e inténtalo de nuevo.",
        redText: "Intentar nuevamente", redClass:"btn bg-red"
      };
      this.showMessage(data);
      this.dialogRef.afterClosed();
    }else{
      this.access = true;
      this.pageType = 1;
    }
  }

  confirmNumber(){
    const param = {
      "account": localStorage.getItem('account'),
      "msisdn": "3100205613" //this.cellPhone
    };

    this.SupportService.activate_package(param).subscribe( res => {
      if(res.error == 1){
        const data = {
          icon: "info",
          text: `Ya tienes un paquete de datos activo en esta línea ${this.cellPhone}.`,
          text2: "Si tienes una duda adicional puedes contactarte con nosotros.",
          redText: "Soporte asistido WhatsApp", redClass:"btn bg-red",
          grayText: "Cerrar", grayClass:"btn bg-dark"
        };
        this.showMessage(data);
        this.dialogRef.afterClosed().subscribe((result: any) => {
          if(result == true)
            window.location.href='https://wa.me/573117488888?text=Fallas%20Masivas';
        });
      }
      
      if(res.error == 0){
        const data = {
          icon: "info",
          text: "Recuerda que este paquete de datos no tiene costo y estará activo por las próximas 72 horas, a partir de este momento.",
          text2: "Te notificaremos al número de contacto del titular cuando el servicio ya se encuentre normalizado.",
          redText: "Finalizar", redClass:"btn bg-red"
        };
        this.showMessage(data);
        this.dialogRef.afterClosed().subscribe((result: any) => {
          if(result == true)
            this.router.navigate(['/']);
        });
      }
    });
  }

  showMessage(info: any){
    this.dialogRef  = this.dialog.open(MessagesComponent, {
      width: '350px',
      data: info
    });
  }

  
  noClaroLine(){
    this.access = true;
    this.pageType = 2;
  }
}
