import {Directive,Input,HostListener,Attribute} from '@angular/core'
@Directive({
  selector: 'input[maxlength]',
  exportAs: 'child'
})
export class MaxLengthDirective {
  @Input() prev!: HTMLElement;
  @Input( )next!:HTMLElement ;

  @HostListener('keyup',['$event']) _(event:any){
     if (!event.target.value && this.prev && event.key=='Backspace')
       this.prev.focus()
     if (event.target.value.length > 0 && this.next){
      if(event.target.value.length > 1)
        event.target.value = event.target.value.slice(0, -1);
      this.next.focus()
    }else{
      if(event.target.value.length > 1)
        event.target.value = event.target.value.slice(0, -1);
    }
  }
  constructor(){}
}
