import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessagesComponent } from 'src/app/core/organisms/messages/messages.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements OnInit {
  // dataSource: any = [];
  dataSource: any = [
    {type: "Internet", equipment: "Módem Arris", model: "ADSF67A9SK"},
    {type: "Televisión", equipment: "Decodificador Newland", model: "DKDUENBZ7"},
    {type: "Televisión", equipment: "MDecodificador Newland", model: "DKDUENBZ7"}];
    selectedEquipment: any;
    dialogRef: any;

  constructor( public dialog: MatDialog,
    private router: Router, ) { }

  ngOnInit(): void {
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
    console.log(this.selectedEquipment.equipment)
    if(this.selectedEquipment.equipment == "Módem Arris"){
      this.router.navigate(['/soporte']);
    }

    if(this.selectedEquipment.equipment == "Decodificador Newland"){
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

    if(this.selectedEquipment.equipment == "MDecodificador Newland"){
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
