import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EllipsisPipe } from './ellipsis.pipe';
import { FirstLetterPipe } from './first-letter.pipe';
import { ObjectToStringPipe } from './objet-to-string.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FirstLetterPipe, ObjectToStringPipe, EllipsisPipe],
  exports: [FirstLetterPipe, ObjectToStringPipe, EllipsisPipe]
})
export class PipesModule {
}
