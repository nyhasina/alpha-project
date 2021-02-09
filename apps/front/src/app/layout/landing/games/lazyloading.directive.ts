import { Directive, ElementRef } from '@angular/core';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({selector: 'img'})
export class LazyloadingDirective {
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;
    console.log(supports)
    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }

}
