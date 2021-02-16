import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMustMatch } from '@nicecactus-platform/form-validators';
@Component({
    selector: 'nicecactus-platform-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss', '../login/login.component.scss'],
})
export class RegisterComponent implements OnInit {
    formRegister: FormGroup;
    submitted = false;
    cookiesCheck = false;

    constructor(private formBuilder?: FormBuilder) {
        this.createformRegister();
    }

    get f() {
        return this.formRegister.controls;
    }

    createformRegister() {
        this.formRegister = this.formBuilder.group(
            {
                email: ['', Validators.compose([Validators.required, this.checkMail])],
                username: ['', Validators.required],
                password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
                confirmPassword: ['', Validators.compose([Validators.required])],
                authorization: [false, Validators.requiredTrue],
                cookies: [false, Validators.requiredTrue],
                code: ['', Validators.required]
            },
            {
                validator: passwordMustMatch('password', 'confirmPassword'),
            }
        );
    }

    checkMail(controls) {
        const regExp = new RegExp(/\S+@\S+\.\S+/);
        if (regExp.test(controls.value)) {
            return null;
        } else {
            return { checkMail: true };
        }
    }

    functionForm01() {
        console.log('ee');
    }

    onSubmit() {
        this.submitted = true;
        if (this.formRegister.valid) {
          console.log(this.formRegister.value)
        }
    }

    ngOnInit(): void {}
}
