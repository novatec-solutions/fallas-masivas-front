import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getValue } from 'src/app/core/enums/document-type.enum';
import { MessagesComponent } from 'src/app/core/organisms/messages/messages.component';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  selectedAddress!: {cuenta: string, direccion: string};
  selectedEquipment!: {serial: string, technology: string, typeService: string};
  dataSource: any = [];
  addressList: boolean = true;
  title!: string;
  dialogRef: any;
  documentType!: string;
  documentNum!: string;

  constructor(private AccountService: AccountService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    [this.documentType, this.documentNum] = localStorage.getItem('document')?.split("-") || [];
    this.checkAddressList();
  }

  checkAddressList(){
    this.title = "Selecciona la dirección en la cual presentas la falla en tus servicios:";

    const param = {
      "documentNumber": this.documentNum,
      "documentType": getValue(this.documentType).id
    };

    this.AccountService.get_address_list(param).subscribe( res => {
      this.dataSource = res.response;
    });
  }

  checkEquipmentList(){
    const contact = JSON.parse(localStorage.getItem('contact') as any);
    const min = contact.type == 4 ? contact.contact : localStorage.getItem('firstPhone');
    
    const param = {
      "customerCode": this.selectedAddress.cuenta,
      "accountCode": this.documentType+""+this.documentNum
    };

    this.AccountService.operation_record(param).subscribe( res => {});

    const data = {
      "account": "40125433",//this.selectedAddress.cuenta,
      "document": this.documentNum,
      "documentType": this.documentType,
      "name": "abc",
      "min": min
    };

    this.AccountService.get_equipment_list(data).subscribe(res => {
      if(res.response && res.response?.length == 0){
        const dialogRef = this.dialog.open(MessagesComponent, {
          width: '350px',
          data: {
            icon: "info",
            text: res.response.description,
            grayText: "Finalizar", redText: "Soporte asistido WhatsApp", grayClass:"btn bg-dark", redClass:"btn bg-red"},
        });
        dialogRef.afterClosed().subscribe((result: any) => {
          if(result == true)
            window.location.href='https://wa.me/573117488888?text=Fallas%20Masivas';
        });
      }else{
        this.addressList = false;
        this.title = "Selecciona el equipo que no está funcionando correctamente. Si son varios equipos selecciona el módem de internet";
        this.dataSource = res.response;
        localStorage.setItem('account', this.selectedAddress.cuenta);
      }
    });
  }

  seeInformation(){
    const data = {
      icon: "info",
      title: "Información del cable módem",
      text: "Recuerda que en la parte posterior de tu módem encuentras",
      redLabel:"la marca, el modelo y el serial", img: "modem.png"
    };
    this.showMessage(data);
  }

  checkEquipment(){
    const data = { 
      "msisdn": 626,
      "isInspira": false,
      "documentType": this.documentType,
      //this.documentNum
      //this.selectedAddress.cuenta,
      "service": [ this.selectedEquipment ],
      
      // "account": 8515291, //Mora
      // "documentId": "1031141581",

      "account": 17090382, //Mantenimiento masivo - radicado
      "documentId": "52953444",

      // "account": 17513584, //Mantenimiento especifico
      // "documentId": "1031141555",
    };

    this.AccountService.diagnose_equipment_failure(data).subscribe(res => {
      if(res.error == 0){
        switch(res.response.typeFailure) { 
          case '1': { 
            this.router.navigate(['/soporte']);
            break; 
          } 
          case '2': { 
            const data = {
              icon: "info",
              text: "Nuestro equipo técnico está trabajando para solucionar las fallas presentadas en tu zona.",
              text2: "Una vez hayamos restablecido los servicios, notificaremos por medios de un mensaje de texto al número de celular del titular.",
              boldText: `Radicado: ${res.response.caseNumber}`,
              redText: "Continuar", redClass:"btn bg-red"
            };
            this.showMessage(data);
            this.dialogRef.afterClosed().subscribe((result: any) => {
              if(result == true)
                this.router.navigate(['/soporte/paquete']);
            });
            break; 
          }
          case '3': { 
            const data = {
              icon: "info",
              text: "Actualmente nuestros técnicos se encuentran realizando trabajos de mantenimiento en tu zona. Esperamos restablecer tus servicios lo antes posible.",
              redText: "Continuar", redClass:"btn bg-red"
            };
            this.showMessage(data);
            this.dialogRef.afterClosed().subscribe((result: any) => {
              if(result == true)
                this.router.navigate(['/soporte/paquete']);
            });
            break; 
         } default: {
          const data = {
            icon: "info",
            text: "No se encontraron fallas",
            redText: "Finalizar", redClass:"btn bg-red"
          };
          this.showMessage(data);
          this.dialogRef.afterClosed().subscribe((result: any) => {
            if(result == true)
              this.router.navigate(['/']);
          });
          break; 
         }
        } 
      }else{
        const dialogRef = this.dialog.open(MessagesComponent, {
              width: '350px',
              data: {
                icon: "x-circle",
                title: "¡Oops, algo salió mal!",
                text: "Se ha presentado un error al hacer la consulta, por favor intenta nuevamente.",
                redText: "Continuar", redClass:"btn bg-red"},
            });
            dialogRef.afterClosed();
      }
    });
  }

  showMessage(info: any){
    this.dialogRef  = this.dialog.open(MessagesComponent, {
      width: '350px',
      data: info
    });
  }

}
