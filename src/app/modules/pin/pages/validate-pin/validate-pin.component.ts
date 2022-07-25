import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessagesComponent } from 'src/app/core/organisms/messages/messages.component';
import { PinService } from '../../services/pin.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Router } from '@angular/router';
import { PinFormConfig } from './validate-pin.config';

@Component({
  selector: 'app-validate-pin',
  templateUrl: './validate-pin.component.html',
  styleUrls: ['./validate-pin.component.scss']
})
export class ValidatePinComponent implements OnInit {
  pinForm!: FormGroup;
  contact = JSON.parse(localStorage.getItem('contact') as any);
  title!: string;
  redBtnText: string | undefined;

  constructor(public fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private PinService: PinService,
    public loaderService: LoadingService) {
    this.pinForm = this.fb.group({
      pin1: ['', [Validators.required]],
      pin2: ['', [Validators.required]],
      pin3: ['', [Validators.required]],
      pin4: ['', [Validators.required]]
      });
      this.generatePin();
  }

  ngOnInit(): void {
    this.title = PinFormConfig.text.validatePin;
  }

  generatePin(){
    const param = {
      "documentClient" : localStorage.getItem('document'),
      "contactData" : this.contact.contact,
      "contactType" : this.contact.type
    };

    this.PinService.generar_pin(param).subscribe({
      next: (res)=> {
        if(res.error == 0){
          const data = {icon: "info", text: PinFormConfig.text.successPin,
          redText: "Aceptar"};
          this.showMessage(data);
        }
      }
    });
  }

  validatePin(){
    this.redBtnText = undefined;
    const form = this.pinForm.value;
    const pinNumber = `${form.pin1}${form.pin2}${form.pin3}${form.pin4}`;

    const param = {
      "documentClient": localStorage.getItem('document'),
      "pinNumber": pinNumber
    };

    this.PinService.validar_pin(param).subscribe((res: { error: number; response: { description: any; }; }) => {
      if(res.error === 0){
        this.router.navigate([PinFormConfig.routes.accountAddress]);
        return
      }

      if( res.response.description == PinFormConfig.errTypes.maxTime){
        this.title = PinFormConfig.text.errorMaxTime;
        this.redBtnText = PinFormConfig.btnText.requestCode;
      }else{
        this.title = PinFormConfig.text.errorPin;
        this.redBtnText = PinFormConfig.btnText.back;
      }      
    });
  }

  showMessage(info: any){
    const dialogRef = this.dialog.open(MessagesComponent, {
      width: '350px',
      data: info
    });
    dialogRef.afterClosed();
  }

  btnAction(){
    if(this.redBtnText == PinFormConfig.btnText.requestCode){
      this.generatePin();
    }
    this.title = PinFormConfig.text.validatePin;
    this.pinForm.reset({pin1:'', pin2:'', pin3:'', pin4:''});
    this.redBtnText = undefined;

  }
}
