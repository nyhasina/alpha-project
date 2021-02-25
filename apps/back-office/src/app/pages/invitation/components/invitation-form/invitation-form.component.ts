import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Invitation,
  INVITATION_STATUS_LABEL,
  InvitationStatus,
  Team,
  User
} from '@nicecactus-platform/graph-ql-service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'nicecactus-platform-invitation-form',
    templateUrl: './invitation-form.component.html',
    styleUrls: ['./invitation-form.component.scss'],
})
export class InvitationFormComponent implements OnChanges, OnInit, OnDestroy {
    @Input() invitation: Invitation;
    @Input() senders: User[];
    @Input() receivers: User[];
    @Input() teams: Team[];
    @Output() save: EventEmitter<Invitation> = new EventEmitter<Invitation>();
    @Output() searchSender: EventEmitter<string> = new EventEmitter<string>();
    @Output() searchReceiver: EventEmitter<string> = new EventEmitter<string>();
    @Output() searchTeam: EventEmitter<string> = new EventEmitter<string>();
    form: FormGroup;
    senderTypeahead$: Subject<string> = new Subject<string>();
    receiverTypeahead$: Subject<string> = new Subject<string>();
    teamTypeahead$: Subject<string> = new Subject<string>();
    private tagSubscription$: Subscription;
    private senderTypeAheadSubscription$: Subscription;
    private receiverTypeAheadSubscription$: Subscription;
    private teamTypeAheadSubscription$: Subscription;

    constructor(private formBuilder: FormBuilder) {}

    _senders: User[] = [];
    _receivers: User[] = [];
    _teams: Team[] = [];
    status: InvitationStatus[] = [];

    get InvitationStatusLabel(): Record<InvitationStatus, string> {
        return INVITATION_STATUS_LABEL;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.invitation && changes.invitation.currentValue) {
            this.form = this.initForm(this.invitation);
        }
        if (changes.senders && changes.senders.currentValue) {
            this.senderValuesHandler();
        }
        if (changes.receivers && changes.receivers.currentValue) {
            this.receiverValuesHandler();
        }
        if (changes.teams && changes.teams.currentValue) {
            this.teamValuesHandler();
        }
    }

    ngOnInit(): void {
        this.senderTypeAheadSubscription$ = this.senderTypeahead$.pipe(debounceTime(1000)).subscribe((term: string) => {
            this.searchSender.emit(term);
        });
        this.receiverTypeAheadSubscription$ = this.receiverTypeahead$
            .pipe(debounceTime(1000))
            .subscribe((term: string) => this.searchReceiver.emit(term));
        this.teamTypeAheadSubscription$ = this.teamTypeahead$
            .pipe(debounceTime(1000))
            .subscribe((term: string) => this.searchTeam.emit(term));
        this.status = Object.values(InvitationStatus);
    }

    ngOnDestroy(): void {
        this.tagSubscription$?.unsubscribe();
        this._senders = [];
        this._receivers = [];
        this._teams = [];
    }

    onSubmit(): void {
        if (this.form.valid) {
            const invitation = {
                ...this.form.value,
                date: new Date(this.form.value.date).toISOString(),
            };
            this.save.emit(invitation);
        }
    }

    onSenderScrollToEnd() {}

    onReceiverScrollToEnd() {}

    private initForm(invitation: Invitation): FormGroup {
        return this.formBuilder.group({
            id: [invitation?.id],
            sender: [(invitation?.sender as User)?.id],
            receiver: [(invitation?.receiver as User)?.id],
            team: [(invitation?.team as Team)?.id],
            status: [invitation?.status],
            date: [invitation?.date],
        });
    }

    private senderValuesHandler() {
        this._senders = [...this.senders];
        if (this.invitation && this.invitation.id) {
            const ids = this._senders.map((item) => item.id);
            const sender = this.invitation.sender as User;
            if (!ids.includes(sender?.id)) {
                this._senders = [...this._senders, sender];
            }
        }
    }

    private receiverValuesHandler() {
        this._receivers = [...this.receivers];
        if (this.invitation && this.invitation.id) {
            const ids = this._receivers.map((item) => item.id);
            const receiver = this.invitation.receiver as User;
            if (!ids.includes(receiver?.id)) {
                this._receivers = [...this._receivers, receiver];
            }
        }
    }

    private teamValuesHandler() {
        this._teams = [...this.teams];
        if (this.invitation && this.invitation.id) {
            const ids = this._teams.map((item) => item.id);
            const team = this.invitation.team as Team;
            if (!ids.includes(team?.id)) {
                this._teams = [...this._teams, team];
            }
        }
    }
}
