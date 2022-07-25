import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getValue, TIPOS_DOCUMENTOS } from 'src/app/core/enums/document-type.enum';
import { MessagesComponent } from 'src/app/core/organisms/messages/messages.component';
import { LoadingService } from 'src/app/core/services/loading.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { AccountContactInfo } from 'src/app/modules/account/interfaces/account-contact.model';
import { AuthService } from '../../services/auth.service';
import { AuthFormConfig } from './validate-user.config';

@Component({
  selector: 'app-validate-user',
  templateUrl: './validate-user.component.html',
  styleUrls: ['./validate-user.component.scss']
})
export class ValidateUserComponent implements OnInit {
  validateForm!: FormGroup;
  title!: string;
  selectedContact: AccountContactInfo | undefined;
  contactData: Array<AccountContactInfo> = [];
  tiposDocumentosLlave = Object.keys(TIPOS_DOCUMENTOS);
  accountErr: boolean = false;                                                       

  constructor(public fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private AuthService: AuthService,
    private UtilsService: UtilsService,
    public loaderService: LoadingService) {
    this.validateForm = this.fb.group({
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]]
      });
  }

  ngOnInit(): void {
    this.title = AuthFormConfig.text.validateAccount;
  }

  validateAccount(){
    this.loaderService.show();
    this.contactData = [];
    const form = this.validateForm.value;
    const param = {
      documentClient : `${form.documentType}-${form.documentNumber}`
    };

    this.AuthService.validar_cuenta(param).subscribe({
      next: (res)=> {
        this.loaderService.hide();
        if(res.error > 0){
          this.title = AuthFormConfig.text.validateContact;
          this.accountErr = true;
        }else{
          localStorage.setItem('document', `${form.documentType}-${form.documentNumber}`);
          this.accountErr = false;
          this.title = AuthFormConfig.text.errorAccount;
          
          let firstPhone = "";
          res.response.map((elem: AccountContactInfo) => {
            if(elem.type == "4" && firstPhone == ""){
              firstPhone = elem.contact;
              localStorage.setItem('firstPhone', firstPhone);
            }
            let mask = this.UtilsService.contactMask(elem.contact);
            elem.activate = false;
            elem.mask = mask;
            this.contactData.push(elem);
          });
        }
      },error: () =>{
        this.loaderService.hide();
        this.showMessage(AuthFormConfig.errorGeneral);
      },
      complete: () => {
        this.loaderService.hide();
      }
    });
  }

  getValue(tipo: string){
    return getValue(tipo);
  }

  showMessage(info: any){
    const dialogRef  = this.dialog.open(MessagesComponent, {
      width: '350px',
      data: info
    });
    dialogRef.afterClosed();
  }

  statusUpdate(item: any, event: any){
    const auxContact: Array<AccountContactInfo> = [];
    this.contactData.map((elem) => {
      if(elem === item){
        elem.activate = event.checked;
        this.selectedContact = event.checked === true ? elem : undefined;
      }else{
        elem.activate = false;
      }
      auxContact.push(elem);
    });
    this.contactData = auxContact;
  }

  continueToGeneratePin(){
    if( this.selectedContact != undefined ){
      localStorage.setItem('contact', JSON.stringify(this.selectedContact));
      this.router.navigate([ AuthFormConfig.routes.pinGenerate ]);
    }
  }

  goBack(){
    this.accountErr = false;
    this.validateForm.reset({documentType: '', documentNumber: ''});
    this.title = AuthFormConfig.text.validateAccount;
  }
}
