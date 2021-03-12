import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tournament } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-tournament-form',
    templateUrl: './tournament-form.component.html',
    styleUrls: ['./tournament-form.component.scss'],
})
export class TournamentFormComponent implements OnChanges {
    @Input() tournament: Tournament;
    @Output() save: EventEmitter<Tournament> = new EventEmitter<Tournament>();
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.tournament && changes.tournament.currentValue) {
            this.form = this.initForm(this.tournament);
        }
    }

    private initForm(tournament: Tournament): FormGroup {
        return this.formBuilder.group({
            id: [tournament?.id],
            name: [tournament?.name, Validators.required],
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }
}
