import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'objectToString',
})
export class ObjectToStringPipe implements PipeTransform {
    transform(value: any[], key: string): unknown {
        return value.map((item) => item[key]);
    }
}
