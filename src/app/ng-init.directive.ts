import { Directive } from '@angular/core';

@Directive({
  selector: '[appNgInit]',
  exportAs: '[appNgInit]',
})
export class NgInitDirective {

  constructor() {
    console.log(65789)
   }

}
