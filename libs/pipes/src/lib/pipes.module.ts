import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FirstLetterPipe } from './first-letter.pipe';
import { ObjetToStringPipe } from './objet-to-string.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FirstLetterPipe, ObjetToStringPipe],
  exports: [FirstLetterPipe, ObjetToStringPipe]
})
export class PipesModule {
}
