import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentReward } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-tournament-reward-form',
    templateUrl: './tournament-form.component.html',
    styleUrls: ['./tournament-form.component.scss'],
})
export class TournamentFormComponent implements OnChanges {
    @Input() tournamentReward: TournamentReward;
    @Output() save: EventEmitter<TournamentReward> = new EventEmitter<TournamentReward>();
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.tournamentReward && changes.tournamentReward.currentValue) {
            this.form = this.initForm(this.tournamentReward);
        }
    }

    private initForm(tournamentReward: TournamentReward): FormGroup {
        return this.formBuilder.group({
            id: [tournamentReward?.id],
            name: [tournamentReward?.name, Validators.required],
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }
}
