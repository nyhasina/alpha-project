import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'objetToString',
})
export class ObjetToStringPipe implements PipeTransform {
    transform(value: any[], key: string): unknown {
        return value.map((item) => item[key]);
    }
}
