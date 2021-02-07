import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'nicecactus-platform-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login/login.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  constructor(
    private formBuilder?: FormBuilder,
  ) {
    this.createformRegister();
   }
   createformRegister() {
    this.formRegister = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        this.checkMail
      ])],
      username: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
      ])],
    });
  }
  checkMail(controls) {
    const regExp = new RegExp(/\S+@\S+\.\S+/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { checkMail: true };
    }
  }
  ngOnInit(): void {
  }

}
