import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getValue, TIPOS_DOCUMENTOS } from 'src/app/core/enums/document-type.enum';
import { MessagesComponent } from 'src/app/core/organisms/messages/messages.component';
import { UtilsService } from 'src/app/core/services/utils.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-validate-user',
  templateUrl: './validate-user.component.html',
  styleUrls: ['./validate-user.component.scss']
})
export class ValidateUserComponent implements OnInit {
  validateForm!: FormGroup;
  title!: string;
  selectedContact: string | undefined;

  tiposDocumentosLlave = Object.keys(TIPOS_DOCUMENTOS);
  contactData: { type: string; contact: string; mask: string; }[] = [];
  contact: boolean = false;

  constructor(public fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private AuthService: AuthService,
    private UtilsService: UtilsService) {
    this.validateForm = this.fb.group({
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]]
      });
  }

  ngOnInit(): void {
    this.title = "Selecciona y digita los datos del documento de identidad del titular de la cuenta"
  }

  validateUser(){
    const form = this.validateForm.value;
    const param = {
      documentClient : `${form.documentType}-${form.documentNumber}`
    };

    this.AuthService.validar_cuenta(param).subscribe( res => {
      if(res.error > 0){
        this.contact = false;
        const dialogRef = this.dialog.open(MessagesComponent, {
          width: '350px',
          data: { icon: "info", text: res.response.description,
          grayText: "Cancelar", redText: "Intentar de Nuevo", grayClass:"btn bg-dark", redClass:"btn bg-red"},
        });
        dialogRef.afterClosed();
      }else{
        localStorage.setItem('document', `${form.documentType}-${form.documentNumber}`);
        this.contact = true;
        this.title = "Los datos que registraste no se encuentran en nuestro sistema. Por favor verifica e intenta de nuevo";
        //Sr Usuario enviaremos un código de confirmación de identidad, por favor indicanos por que medio desea recibirlo

        res.response.map((elem: { type: any; contact: any; mask: any; }) => {
          console.log("map: ", elem)
            let mask = elem.type == "4" ? this.UtilsService.contactMask(elem.contact, 8) : this.UtilsService.contactMask(elem.contact, 3);
            elem.mask = mask;
            this.contactData.push(elem);
        });
      }
    });
  }

  getValue(tipo: string){
    return getValue(tipo);
  }

  continueToGeneratePin(){
    if( this.selectedContact != undefined ){
      localStorage.setItem('contact', JSON.stringify(this.selectedContact));
      this.router.navigate(['/pin']);
    }

  }
}
