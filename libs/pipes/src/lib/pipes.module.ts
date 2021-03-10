import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FirstLetterPipe } from './first-letter.pipe';
import { ObjectToStringPipe } from './objet-to-string.pipe';
import { EllipsisPipe } from './ellipsis.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FirstLetterPipe, ObjectToStringPipe, EllipsisPipe],
  exports: [FirstLetterPipe, ObjectToStringPipe]
})
export class PipesModule {
}
