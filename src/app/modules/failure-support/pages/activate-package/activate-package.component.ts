import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessagesComponent } from 'src/app/core/organisms/messages/messages.component';

@Component({
  selector: 'app-activate-package',
  templateUrl: './activate-package.component.html',
  styleUrls: ['./activate-package.component.scss']
})
export class ActivatePackageComponent implements OnInit {
  validateForm!: FormGroup;
  dialogRef: any;
  confirmation: boolean = false;

  constructor(public fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router) {
    this.validateForm = this.fb.group({
      cellPhone: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  activateDataPackage(){
    const cellPhone = this.validateForm.value.cellPhone;
    if(cellPhone == '1'){
      const data = {
        icon: "x-circle",
        title: "¡Oops, algo salió mal!",
        text: "El número que ingresaste no es válido, revisa que no tenga espacio, ni signos de puntuación e inténtalo de nuevo.",
        redText: "Continuar", redClass:"btn bg-red"
      };
      this.showMessage(data);
      this.dialogRef.afterClosed();
    }
    if(cellPhone == '12'){
      const data = {
        icon: "info",
        boldTextHeader: "Aprovecha el paquete de datos adicional que está activo en la línea 3138856433.",
        text: "¡Seguimos trabajando en normalizar tus servicios hogar!",
        redText: "Soporte asistido WhatsApp", redClass:"btn bg-red",
        grayText: "Cerrar", grayClass:"btn bg-dark"
      };
      this.showMessage(data);
      this.dialogRef.afterClosed().subscribe((result: any) => {
        if(result == true)
          this.router.navigate(['/soporte/paquete']);
      });
    }
    if(cellPhone == '123'){
      this.confirmation = true;
    }
  }

  confirmNumber(){
    const data = {
      // icon: "info", falta imagen
      boldTextHeader: "Ya quedo activo el paquete de datos ilimitado en la línea móvil Claro:",
      boldTextRed: "3138856433",
      text: "Recuerda que este paquete no tiene costo y los puedes disfrutar mientras restablecemos tus servicios hogar.",
      text2: "Te notificaremos a este número cuando el servicio ya se encuentre normalizado.",
      redText: "Finalizar", redClass:"btn bg-red"
    };
    this.showMessage(data);
    this.dialogRef.afterClosed();
  }

  showMessage(info: any){
    this.dialogRef  = this.dialog.open(MessagesComponent, {
      width: '350px',
      data: info
    });
  }
}
