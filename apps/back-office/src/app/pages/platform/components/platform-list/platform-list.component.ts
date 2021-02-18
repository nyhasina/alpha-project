import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Platform } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-platform-list',
    templateUrl: './platform-list.component.html',
    styleUrls: ['./platform-list.component.scss'],
})
export class PlatformListComponent {
    @Input() items: Platform[];
    @Output() delete: EventEmitter<Platform> = new EventEmitter<Platform>();
}
