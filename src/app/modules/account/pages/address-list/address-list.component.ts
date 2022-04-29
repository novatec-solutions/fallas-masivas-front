import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getValue } from 'src/app/core/enums/document-type.enum';
import { MessagesComponent } from 'src/app/core/organisms/messages/messages.component';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  selectedAddress: string | undefined;
  dataSource: any = [];

  constructor(private AccountService: AccountService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.consultar_datos();
  }

  consultar_datos(){
    const [tipo, documento] = localStorage.getItem('document')?.split("-") || [];
    const param = {
      "documentNumber": documento,
      "documentType": getValue(tipo).id
    };

    this.AccountService.consultar_datos(param).subscribe((res: { error: number; response: { description: any; map: (arg0: (elem: { cuenta: string; direccion: string; mask: string; }) => void) => void; }; }) => {
      if(res.error > 0){
        const dialogRef = this.dialog.open(MessagesComponent, {
          width: '350px',
          data: {
            icon: "info",
            text: res.response.description,
            grayText: "Finalizar", redText: "Soporte asistido WhatsApp", grayClass:"btn bg-dark", redClass:"btn bg-red"},
        });
        dialogRef.afterClosed();
      }else{
        this.dataSource = res.response;
      }
    });
  }

}
