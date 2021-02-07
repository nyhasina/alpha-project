
import { FormGroup } from '@angular/forms';

export function matchPwds(pw: string, matchingpw: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[pw];
        const matchingControl = formGroup.controls[matchingpw];
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

