import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[prappdbHeader]'
})
export class HeaderDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('window:scroll', ['']) onScroll(e:any){
    const scrollPosition = window.scrollY;
    // scrollPosition > 0 
    // ? this.renderer.addClass(this.el.nativeElement, 'heropattern')
    // : this.renderer.removeClass(this.el.nativeElement, 'heropattern')
  }
}
