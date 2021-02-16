import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent {
    @Input() items: Game[];
    @Output() delete: EventEmitter<number> = new EventEmitter<number>();
}
