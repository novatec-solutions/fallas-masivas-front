import { Component, OnInit, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  buttonClass:string = '';

  @Input()
  buttonDisabled:string = "false";

  disabled:boolean = false;

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes:SimpleChange){
    this.disabled =  this.buttonDisabled.toLowerCase() == 'true' ? true : false;
  }

}
