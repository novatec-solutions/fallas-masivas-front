import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getValue } from 'src/app/core/enums/document-type.enum';
import { MessagesComponent } from 'src/app/core/organisms/messages/messages.component';
import { LoadingService } from 'src/app/core/services/loading.service';
import { TypeList } from '../../enums/contact-type.enum';
import { AccountService } from '../../services/account.service';
import { accountFormConfig } from './account-list.config';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  selectedAddress!: {cuenta: string, direccion: string};
  selectedEquipment!: {serial: string, technology: string, typeService: string};
  dataSource: any = [];
  title!: string;
  dialogRef: any;
  documentType!: string;
  documentNum!: string;
  displayedColumns: string[] = ['slider', 'account', 'address'];
  checkList: string = 'address';
  msgEquipment: string | undefined;
  typeFailure: any | undefined;

  constructor(private AccountService: AccountService,
    public dialog: MatDialog,
    private router: Router,
    public loaderService: LoadingService) { 
      [this.documentType, this.documentNum] = localStorage.getItem('document')?.split("-") || [];
      this.checkAddressList();
    }

  ngOnInit(): void {}

  checkAddressList(){
    this.loaderService.show();
    this.title = accountFormConfig.text.addressList;
    this.checkList = 'address';

    const param = {
      "documentNumber": this.documentNum,
      "documentType": getValue(this.documentType).id
    };

    this.AccountService.get_address_list(param).subscribe({
      next: (res) => {
        this.dataSource = res.response;
      }, error: () =>{
        this.loaderService.hide();
        this.showMessage(accountFormConfig.errorGeneral);
      }, complete: () =>{
        this.loaderService.hide();
      }
    });
  }

  addressMask(address: string) {
    return address.substring(0,7) + "*".repeat(3);
  }

  checkEquipmentList(){
    this.loaderService.show();
    const contact = JSON.parse(localStorage.getItem('contact') as any);
    const min = contact.type == 4 ? contact.contact : localStorage.getItem('firstPhone');
    
    const param = {
      "customerCode": this.selectedAddress.cuenta,
      "accountCode": this.documentType+""+this.documentNum
    };

    this.AccountService.operation_record(param).subscribe();

    const data = {
      "account": this.selectedAddress.cuenta,
      "document": this.documentNum,
      "documentType": this.documentType,
      "name": "abc",
      "min": min
    };

    this.AccountService.get_equipment_list(data).subscribe({
      next: (res) => {
        if(res.response && res.response?.length == 0){
          this.checkList = 'equipment';
          this.msgEquipment = accountFormConfig.text.noEquipment;
        }else{
          this.title = accountFormConfig.text.equipmentList;
          const dataSourceAux = res.response.filter(function(item: { typeService: string; }) {
            return item.typeService !== 'Telefonia';
          });
          this.dataSource = dataSourceAux;
          localStorage.setItem('account', this.selectedAddress.cuenta);
        }
      }, error: () =>{
        this.loaderService.hide();
        this.showMessage(accountFormConfig.errorGeneral);
      }, complete: () =>{
        this.checkList = 'equipment'; 
        this.loaderService.hide();
      }
    });
  }

  statusUpdate(item: any, event: any){
    const auxAddress: any[] = [];
    this.dataSource.map((elem: any) => {
      if(elem === item){
        elem.activate = event.checked;
        if(this.checkList == TypeList.ADDRESS){
          this.selectedAddress = event.checked === true ? elem : undefined;
        }else{
          this.selectedEquipment = event.checked === true ? elem : undefined;
        }
        
      }else{
        elem.activate = false;
      }
      auxAddress.push(elem);
    });
    this.dataSource = auxAddress;
  }

  goSupport(){
    window.location.href= accountFormConfig.routes.assistedSupport;
  }

  seeInformation(){
    this.showMessage(accountFormConfig.infoModem);
  }

  goPackageSupport(){
    this.router.navigate([accountFormConfig.routes.packageSupport]);
  }

  diagnoseEquipment(){
    this.loaderService.show();
    const data = { 
      "msisdn": 626,
      "isInspira": false,
      "documentType": this.documentType,
      "documentId": this.documentNum,
      "account": parseInt(this.selectedAddress.cuenta),
      "service": [ this.selectedEquipment ],
    };

    this.AccountService.diagnose_equipment_failure(data).subscribe({ 
      next: (res) => {
        if(res.error === 0){
          switch(res.response.typeFailure) { 
            case '1': { 
              this.router.navigate([accountFormConfig.routes.goPay]);
              break; 
            } 
            case '2': { 
              this.checkList = 'failure';
              this.typeFailure = {
                text1: accountFormConfig.radicado.text1,
                text2: accountFormConfig.radicado.text2,
                boldText: `Radicado: ${res.response.caseNumber}`
              };
              break; 
            }
            case '3': { 
              this.checkList = 'failure';
              this.typeFailure = accountFormConfig.specificFailure;
              break; 
            } default: {
              this.showMessage(accountFormConfig.generalFailure);
              this.dialogRef.afterClosed().subscribe((result: any) => {
                if(result == true)
                  this.router.navigate([accountFormConfig.routes.goAccountList]);
              });
              break; 
            }
          } 
          return;
        }
      }, error: () =>{
        this.loaderService.hide();
        this.showMessage(accountFormConfig.errorGeneral);
      }, complete: () =>{
        this.loaderService.hide();
      }
    });
  }

  showMessage(info: any){
    this.dialogRef  = this.dialog.open(MessagesComponent, {
      width: '350px',
      data: info
    });
    this.dialogRef.afterClosed();
  }

}
