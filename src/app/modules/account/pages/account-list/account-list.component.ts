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

  constructor(private AccountService: AccountService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.checkAddressList();
  }

  checkAddressList(){
    this.title = "Selecciona la dirección en la cual presentas la falla en tus servicios";
    const [type, document] = localStorage.getItem('document')?.split("-") || [];

    const param = {
      "documentNumber": document,
      "documentType": getValue(type).id
    };

    this.AccountService.get_address_list(param).subscribe( res => {
      this.dataSource = res.response;
    });
  }

  checkEquipmentList(){
    const [type, document] = localStorage.getItem('document')?.split("-") || [];
    const contact = JSON.parse(localStorage.getItem('contact') as any);
    const min = contact.type == 4 ? contact.contact : localStorage.getItem('firstPhone');
    const param = {
      "customerCode": this.selectedAddress.cuenta,
      "accountCode": type+""+document
    };

    this.AccountService.operation_record(param).subscribe( res => {});

    const data = {
      "account": "40125433", //this.selectedAddress.cuenta,
      "document": "1234567890", //document
      "documentType": "CC", //type
      "name": "abc", //""
      "min": "25" //min
    };

    this.AccountService.get_equipment_list(data).subscribe(res => {
      if(res.response.length == 0){
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
        this.title = "Por favor seleccione el equipo que presenta la falla. Si el inconveniente se presenta en más de un servicio seleccione su dispositivo de internet";
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
    if(this.selectedEquipment.technology == "LTE"){
      this.router.navigate(['/soporte']);
    }

    if(this.selectedEquipment.technology == "CTI"){
      const data = {
        icon: "info",
        text: "Nuestro equipo técnico esta trabajando para solucionar las fallas presentadas en tu zona.",
        text2: "Una vez hayamos restablecido los servicios, notificaremos por medios de un mensaje de texto al número de celular del titular.",
        boldText:"Radicado: INC2345",
        redText: "Continuar", redClass:"btn bg-red"
      };
      this.showMessage(data);
      this.dialogRef.afterClosed().subscribe((result: any) => {
        if(result == true)
          this.router.navigate(['/soporte/paquete']);
      });
    }

    if(this.selectedEquipment.technology == "NGR"){
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
    }
  }

  showMessage(info: any){
    this.dialogRef  = this.dialog.open(MessagesComponent, {
      width: '350px',
      data: info
    });
  }

}
