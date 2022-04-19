import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerifyClientService } from '../../shared/services/verify-client.service';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { getValue } from 'src/app/shared/Enums/document-type.enum';
import { DataOperationService } from '../../shared/services/data-operation.service';

@Component({
  selector: 'app-equipos-list',
  templateUrl: './equipos-list.component.html',
  styleUrls: ['./equipos-list.component.scss']
})
export class EquiposListComponent implements OnInit {
  displayedColumns: string[] = ['slide', 'cuenta', 'direccion'];
  dataSource: any = [];

  constructor(private VerifyClientService: VerifyClientService,
    public dialog: MatDialog,
    private DataOperationService: DataOperationService) { }

  ngOnInit(): void {
    this.consultar_datos();
  }

  consultar_datos(){
    const [tipo, documento] = localStorage.getItem('document')?.split("-") || [];
    const param = {
      "documentNumber": documento,
      "documentType": getValue(tipo).id
    };

    this.VerifyClientService.consultar_datos(param).subscribe(res => {
      if(res.error > 0){
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '350px',
          data: {text: res.response.description,
          grayBtn: "Cancelar", redBtn: "Intentar de Nuevo"},
        });
        dialogRef.afterClosed();
      }else{
        let dataArr: { cuenta: string; direccion: string; mask: string; }[] = [];
        res.response.map( (elem: { cuenta: string; direccion: string; mask: string; }) => {
          let mask =  this.DataOperationService.contactMask(elem.direccion, 5);
          elem.mask = mask;
          dataArr.push(elem);
        });
        this.dataSource = dataArr;
      }
    });
  }

}
