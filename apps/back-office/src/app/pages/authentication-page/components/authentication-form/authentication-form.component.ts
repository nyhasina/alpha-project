import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'nicecactus-platform-authentication-form',
    templateUrl: './authentication-form.component.html',
    styleUrls: ['./authentication-form.component.scss'],
})
export class AuthenticationFormComponent implements OnInit {
    form: FormGroup;
    @Output() signIn: EventEmitter<{ email: string; password: string }> = new EventEmitter<{ email: string; password: string }>();

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.initForm();
    }

    onSubmit() {
        if (this.form.valid) {
            this.signIn.emit(this.form.value);
        }
    }

    private initForm() {
        return this.formBuilder.group({
            email: [null, Validators.required],
            password: [null, Validators.required],
        });
    }
}
