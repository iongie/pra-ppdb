import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[prappdbAccordion]'
})
export class AccordionDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('click') onClick() {
    // Mendapatkan semua elemen accordion
    const accordionElements = document.querySelectorAll('[id^=accordion-flush-body]');
    
    // Menyembunyikan semua elemen accordion
    accordionElements.forEach(element => {
      this.renderer.addClass(element, 'hidden');
    });
    
    const accordionBody = this.el.nativeElement.nextElementSibling;

    // Toggle class 'hidden' pada elemen yang terkait
    if (accordionBody) {
      const isHidden = accordionBody.classList.contains('hidden');
      if (isHidden) {
        this.renderer.removeClass(accordionBody, 'hidden');
      } else {
        this.renderer.addClass(accordionBody, 'hidden');
      }
    }

    const buttonElements = document.querySelectorAll('[id^=accordion-flush-heading] button');

    // Menyembunyikan semua tombol
    buttonElements.forEach(button => {
      // Membersihkan semua kelas sebelum menambahkan yang baru
      this.renderer.removeClass(button, 'bg-primary-main');
      this.renderer.removeClass(button, 'text-primary-1');

      if (button !== this.el.nativeElement) {
        this.renderer.addClass(button, 'text-gray-500');
    }
    });

    const button = this.el.nativeElement.querySelector('button');
    if (button) {
      this.renderer.removeClass(button, 'text-gray-500');
      this.renderer.addClass(button, 'bg-primary-main');
      this.renderer.addClass(button, 'text-primary-1');
    }


    
  }
}
