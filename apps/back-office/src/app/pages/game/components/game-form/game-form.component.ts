import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from '@nicecactus-platform/graph-ql-service';
import { GameDependencies } from '../../store/game.reducers';

@Component({
    selector: 'nicecactus-platform-game-form',
    templateUrl: './game-form.component.html',
    styleUrls: ['./game-form.component.scss'],
})
export class GameFormComponent implements OnChanges {
    @Input() game: Game;
    @Input() dependencies: GameDependencies;
    @Output() save: EventEmitter<Game> = new EventEmitter<Game>();
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.game && changes.game.currentValue) {
            this.form = this.initForm(this.game);
        }
    }

    private initForm(game: Game): FormGroup {
        return this.formBuilder.group({
            id: [game?.id],
            name: [game?.name, Validators.required],
            coverImage: [game?.coverImage],
            platforms: [game?.platforms],
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }
}
