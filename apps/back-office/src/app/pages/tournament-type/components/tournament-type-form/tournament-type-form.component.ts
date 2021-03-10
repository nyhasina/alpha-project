import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentReward, TournamentType } from '@nicecactus-platform/graph-ql-service';
import { TournamentTypeDependencies } from '../../interfaces/tournament-type-dependencies.interface';

@Component({
    selector: 'nicecactus-platform-tournament-type-form',
    templateUrl: './tournament-type-form.component.html',
    styleUrls: ['./tournament-type-form.component.scss'],
})
export class TournamentTypeFormComponent implements OnChanges {
    @Input() tournamentType: TournamentType;
    @Input() dependencies: TournamentTypeDependencies;
    @Output() save: EventEmitter<TournamentType> = new EventEmitter<TournamentType>();
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.tournamentType && changes.tournamentType.currentValue) {
            this.form = this.initForm(this.tournamentType);
        }
    }

    private initForm(tournamentType: TournamentType): FormGroup {
        return this.formBuilder.group({
            id: [tournamentType?.id],
            name: [tournamentType?.name, Validators.required],
            reward: [(tournamentType?.reward as TournamentReward)?.id, Validators.required],
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }
}
