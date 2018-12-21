import { 
    Directive,
    Renderer2,
    OnInit,
    ElementRef,
    HostListener,
    HostBinding
 } from '@angular/core';

@Directive({
    selector : '[appDropdown]'
})
export class DropdownDirective{

    //isOpen:boolean = false;
    
    @HostBinding ('class.open') isOpen = false;

    constructor(private elementRef:ElementRef, private render:Renderer2){

    }

    @HostListener('click') toggleOpen(eventData:Event)
    {
        //console.log('Click! ' + this.isOpen );
        this.isOpen = !this.isOpen;
        /* if (this.isOpen)
        {
            this.render.addClass(this.elementRef.nativeElement, "open");
        }
        else
        {
            this.render.removeClass(this.elementRef.nativeElement, "open");
        } */
    }
}