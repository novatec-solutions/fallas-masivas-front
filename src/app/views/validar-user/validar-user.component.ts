import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { VerifyClientService } from '../../shared/services/verify-client.service';

@Component({
  selector: 'app-validar-user',
  templateUrl: './validar-user.component.html',
  styleUrls: ['./validar-user.component.scss']
})
export class ValidarUserComponent implements OnInit {
  validateForm!: FormGroup;
  title!: string;
  contactData: { type: string; contact: string; mask: string; check: boolean }[] = [];
  contact: boolean = false;

  constructor(public fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private VerifyClientService: VerifyClientService) {
    this.validateForm = this.fb.group({
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]]
      });
  }

  ngOnInit(): void {
    this.title = "Por favor selecciona tipo de Documento y digita el número de Documento del Titular de la cuenta"
  }

  validateUser(){
    const form = this.validateForm.value;
    localStorage.setItem('document', `${form.documentType}-${form.documentNumber}`);
    const param = {
      documentClient :  "CC-80795939" //`${form.documentType}-${form.documentNumber}`
    };

    this.VerifyClientService.validar_cuenta(param).subscribe(res => {
      if(res.error > 0){
        this.contact = false;
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '350px',
          data: {text: res.response.description,
          grayBtn: "Cancelar", redBtn: "Intentar de Nuevo"},
        });
        dialogRef.afterClosed();
      }else{
        this.contact = true;
        this.title = "Sr Usuario enviaremos un código de confirmación de identidad, por favor indicanos por que medio desea recibirlo";

        res.response.forEach( (elem: { type: string; contact: string; mask: string; check: boolean }) => {
            let mask = elem.type == "1" ? this.telephoneMask(elem.contact) : this.emailMask(elem.contact);
            elem.mask = mask;
            elem.check = false;
            this.contactData.push(elem);
        });
      }
    });
  }

  generatePin(){
    const seleccion = this.contactData.filter(item => { return (item.check == true) });
    localStorage.setItem('contact', JSON.stringify(seleccion[0]));

    const param = {
      "documentClient" : "CC-1010180007",//localStorage.getItem('document')
      "contactData" : "3115737115", //seleccion[0].contact
      "contactType" : "4" //seleccion[0].type
    };

    this.VerifyClientService.generar_pin(param).subscribe(res => {
      this.router.navigate(['/pin']);
    });
  }

  contactSelection(info: any){
    this.contactData.filter(opt => { opt.check = (opt != info) ? false : true;});
  }

  telephoneMask (telephone: string) {
    return telephone.substring(0,6) + "*".repeat(4);
  }

  emailMask (email: string) {
    let arr = email.split("@");
    let inicio = arr[0];
    let fin = "*".repeat(arr[1].length);
    return inicio + "*" + fin;
  };
}
