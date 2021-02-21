import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CodeLabel, Profile, User } from '@nicecactus-platform/graph-ql-service';
import { UserDependencies } from '../../store/user.reducers';

@Component({
    selector: 'nicecactus-platform-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnChanges {
    @Input() user: User;
    @Input() dependencies: UserDependencies;
    @Output() save: EventEmitter<User> = new EventEmitter<User>();
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.user && changes.user.currentValue) {
            this.form = this.initForm(this.user);
        }
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    private initForm(user: User): FormGroup {
        return this.formBuilder.group({
            id: [user?.id],
            email: [user?.email],
            password: [user?.password],
            passwordConfirmation: [user?.password],
            profile: this.initProfile(user?.profile),
        });
    }

    private initProfile(profile: Profile) {
        return this.formBuilder.group({
            id: [profile?.id],
            username: [profile?.username],
            firstname: [profile?.firstname],
            lastname: [profile?.lastname],
            currency: [(profile?.currency as CodeLabel)?.id],
            language: [(profile?.language as CodeLabel)?.id],
        });
    }
}
