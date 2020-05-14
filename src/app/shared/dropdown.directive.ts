import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
    selector: '[appDropDown]',
  exportAs:'appDropDown'
  })

  export class DropdownDirective{
    constructor(private elRef:ElementRef){}
     @HostBinding('class.open') isOpen = false;
     @HostListener('document:click',['$event']) toggleOpen(event:Event){
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen :false;
     }
     
    // @HostListener('click') toggleOpen() {
    //   this.isOpen = !this.isOpen;
  }

