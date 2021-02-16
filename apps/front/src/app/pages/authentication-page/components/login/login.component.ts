import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'nicecactus-platform-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  constructor(
    private formBuilder?: FormBuilder,
  ) {
    this.createlogin();
   }
   get f() { return this.formLogin.controls; }
   createlogin() {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
  });
  }
  submitLogin() {
    if (this.formLogin.valid) {
      console.log(this.formLogin.value)
    }
  }
  ngOnInit(): void {
  }

}
