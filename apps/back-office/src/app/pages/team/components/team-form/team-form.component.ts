import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tag, Team, TeamDependencies, User } from '@nicecactus-platform/graph-ql-service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'nicecactus-platform-team-form',
    templateUrl: './team-form.component.html',
    styleUrls: ['./team-form.component.scss'],
})
export class TeamFormComponent implements OnChanges, OnDestroy {
    @Input() team: Team;
    @Input() dependencies: TeamDependencies;
    @Output() save: EventEmitter<Team> = new EventEmitter<Team>();
    @Output() searchTag: EventEmitter<string> = new EventEmitter<string>();
    form: FormGroup;
    private tagSubscription$: Subscription;

    constructor(private formBuilder: FormBuilder) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.team && changes.team.currentValue) {
            this.form = this.initForm(this.team);
            this.tagSubscription$ = this.form
                .get('tag')
                .valueChanges.pipe(debounceTime(1000))
                .subscribe((tagSearchTerm) => {
                    this.searchTag.emit(tagSearchTerm);
                });
        }
    }

    ngOnDestroy(): void {
        this.tagSubscription$?.unsubscribe();
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    private initForm(team: Team): FormGroup {
        return this.formBuilder.group({
            id: [team?.id],
            name: [team?.name, Validators.required],
            tag: [(team?.tag as Tag)?.name],
            owner: [(team.owner as User)?.id],
            members: [(team.members || []).map((item) => item.id)],
        });
    }
}
