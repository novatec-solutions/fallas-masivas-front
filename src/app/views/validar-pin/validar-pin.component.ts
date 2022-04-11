import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { VerifyClientService } from '../../shared/services/verify-client.service';

@Component({
  selector: 'app-validar-pin',
  templateUrl: './validar-pin.component.html',
  styleUrls: ['./validar-pin.component.scss']
})
export class ValidarPinComponent implements OnInit {
  pinForm!: FormGroup;

  constructor(public fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private VerifyClientService: VerifyClientService) {
    this.pinForm = this.fb.group({
      pin1: ['', [Validators.required]],
      pin2: ['', [Validators.required]],
      pin3: ['', [Validators.required]],
      pin4: ['', [Validators.required]]
      });
  }

  ngOnInit(): void {
    this.setTimeout();
  }

  validatePin(){
    const form = this.pinForm.value;
    const pinNumber = `${form.pin1}${form.pin2}${form.pin3}${form.pin4}`;
    
    const param = {
      "documentClient": localStorage.getItem('document'),
      "pinNumber": pinNumber
    };

    this.VerifyClientService.validar_pin(param).subscribe(res => {
      if(res.error > 0){
        const data = {text: res.response.description,
              grayBtn: "Volver", redBtn: "Finalizar"};
        this.showMessage(data);
      }else{
        this.router.navigate(['/equipos']);
      }
    });
  }

  generatePinAgain(){
    const contact = JSON.parse(localStorage.getItem('contact') as any);
    const param = {
      "documentClient" : localStorage.getItem('document'),
      "contactData" : contact.contact,
      "contactType" : contact.type
    };

    this.VerifyClientService.generar_pin(param).subscribe(res => {
      if(res.error == 0){
        const data = {text: "Pin Generado satisfactoriamente",
              grayBtn: "Volver", redBtn: "Aceptar"};
        this.showMessage(data);
      }
      this.setTimeout();
    });
  }

  setTimeout(){
    setTimeout(() =>{
      const data = {text: "Señor Usuario el Código que ingreso ha superado el tiempo máximo de activación",
              grayBtn: "Generar código", redBtn: "Finalizar"};
      this.showMessage(data);
    }, 900000);
  }

  showMessage(info: any){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: info
    });
    dialogRef.afterClosed();
  }
}
