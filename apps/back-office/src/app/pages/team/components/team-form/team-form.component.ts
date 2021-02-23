import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tag, Team, TeamDependencies, User } from '@nicecactus-platform/graph-ql-service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'nicecactus-platform-team-form',
    templateUrl: './team-form.component.html',
    styleUrls: ['./team-form.component.scss'],
})
export class TeamFormComponent implements OnChanges, OnInit, OnDestroy {
    @Input() team: Team;
    @Input() dependencies: TeamDependencies;
    @Input() users: User[];
    @Output() save: EventEmitter<Team> = new EventEmitter<Team>();
    @Output() searchTag: EventEmitter<string> = new EventEmitter<string>();
    @Output() searchUser: EventEmitter<string> = new EventEmitter<string>();
    form: FormGroup;
    userTypeahead$: Subject<string> = new Subject<string>();
    private tagSubscription$: Subscription;
    private userTypeAheadSubscription$: Subscription;

    constructor(private formBuilder: FormBuilder) {}

    _users: User[] = [];

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
        if (changes.users && changes.users.currentValue) {
            this.userValuesHandler();
        }
    }

    ngOnInit(): void {
        this.userTypeAheadSubscription$ = this.userTypeahead$
            .pipe(debounceTime(1000))
            .subscribe((term: string) => this.searchUser.emit(term));
    }

    private userValuesHandler() {
        this._users = [...this.users];
        if (this.team && this.team.id) {
            const ids = this._users.map((item) => item.id);
            this.team.members.forEach((member) => {
                if (!ids.includes(member.id)) {
                    this._users.push(member);
                }
            });
        }
    }

    ngOnDestroy(): void {
        this.tagSubscription$?.unsubscribe();
        this._users = [];
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    onUserScrollToEnd() {}

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
