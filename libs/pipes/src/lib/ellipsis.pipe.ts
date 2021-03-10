import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ellipsis',
})
export class EllipsisPipe implements PipeTransform {
    transform(value: string): unknown {
        if (value.length <= 50) {
            return value;
        }
        return `${value.slice(0, 50)}...`;
    }
}
