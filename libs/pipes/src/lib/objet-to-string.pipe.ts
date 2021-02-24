import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash';

@Pipe({
    name: 'objectToString',
})
export class ObjectToStringPipe implements PipeTransform {
    transform(value: any[], key: string): unknown {
        return value.map((item) => get(item, key));
    }
}
