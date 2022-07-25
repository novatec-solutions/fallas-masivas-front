import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessagesComponent } from 'src/app/core/organisms/messages/messages.component';
import { LoadingService } from 'src/app/core/services/loading.service';
import { environment } from 'src/environments/environment';
import { SupportService } from '../../services/support.service';
import { packageFormConfig } from './activate-package.config';

@Component({
  selector: 'app-activate-package',
  templateUrl: './activate-package.component.html',
  styleUrls: ['./activate-package.component.scss']
})
export class ActivatePackageComponent implements OnInit {
  validateForm!: FormGroup;
  dialogRef: any;
  access: boolean = false;
  pageType = 0;
  cellPhone!: string ;
  public get assetsTyCPath(){
    return environment.assetsTyCPath;
  }

  constructor(public fb: FormBuilder,
    public dialog: MatDialog,
    private SupportService: SupportService,
    private router: Router,
    public loaderService: LoadingService) {
    this.validateForm = this.fb.group({
      cellPhone: ['', [Validators.required]],
      terms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
  }

  activateDataPackage(){
    this.cellPhone = this.validateForm.value.cellPhone;
    const regex = new RegExp(/^3{1}\d{9}$/);
    if(!regex.test(this.cellPhone)){
      this.showMessage(packageFormConfig.invalidPhone);
      this.dialogRef.afterClosed();
    }else{
      this.access = true;
      this.pageType = 1;
    }
  }

  confirmNumber(){
    this.loaderService.show();
    const param = {
      "account": localStorage.getItem('account'),
      "msisdn": this.cellPhone
    };

    this.SupportService.activate_package(param).subscribe({ 
      next: (res) => {
        if(res.error == 1){
          this.pageType = 3;
        }
        
        if(res.error == 0){
          this.showMessage(packageFormConfig.successActivation);
          this.dialogRef.afterClosed().subscribe((result: any) => {
            if(result == true)
              this.router.navigate(['/']);
          });
        }
      },error: () =>{
        this.loaderService.hide();
        this.showMessage(packageFormConfig.errorGeneral);
        this.dialogRef.afterClosed();
      },
      complete: () => {
        this.loaderService.hide();
      }
    });
  }

  showMessage(info: any){
    this.loaderService.hide();
    this.dialogRef  = this.dialog.open(MessagesComponent, {
      width: '350px',
      data: info
    });
  }

  goSupport(){
    window.location.href= packageFormConfig.routes.assistedSupport;
  }

  goBack(){
    this.router.navigate(['/']);
  }

  
  noClaroLine(){
    this.access = true;
    this.pageType = 2;
  }
}
