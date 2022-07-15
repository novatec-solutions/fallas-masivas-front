import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessagesComponent } from 'src/app/core/organisms/messages/messages.component';
import { PinService } from '../../services/pin.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validate-pin',
  templateUrl: './validate-pin.component.html',
  styleUrls: ['./validate-pin.component.scss']
})
export class ValidatePinComponent implements OnInit {
  pinForm!: FormGroup;
  contact = JSON.parse(localStorage.getItem('contact') as any);

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

  ngOnInit(): void {}

  generatePin(){
    const param = {
      "documentClient" : localStorage.getItem('document'),
      "contactData" : this.contact.contact,
      "contactType" : this.contact.type
    };

    this.PinService.generar_pin(param).subscribe({
      next: (res)=> {
        if(res.error == 0){
          const data = {icon: "info", text: "Pin Generado satisfactoriamente",
          redText: "Aceptar", redClass:"btn bg-red"};
          this.showMessage(data);
        }
      }
    });
  }

  validatePin(){
    const form = this.pinForm.value;
    const pinNumber = `${form.pin1}${form.pin2}${form.pin3}${form.pin4}`;

    const param = {
      "documentClient": localStorage.getItem('document'),
      "pinNumber": pinNumber
    };

    this.PinService.validar_pin(param).subscribe((res: { error: number; response: { description: any; }; }) => {
      if(res.error > 0){
        const data = {icon: "info", text: res.response.description,
          grayText: "Finalizar", redText: "Atras", grayClass:"btn bg-dark", redClass:"btn bg-red"};
        this.showMessage(data);
      }else{
        this.router.navigate(['/cuenta']);
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
}
