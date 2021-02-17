import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationResponse, SIGN_IN } from '@nicecactus-platform/graph-ql-service';
import { Apollo } from 'apollo-angular';
@Component({
  selector: 'nicecactus-platform-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin: FormGroup;
  constructor(
    private formBuilder?: FormBuilder,
    private apolloService?: Apollo
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
      this.apolloService.mutate<AuthenticationResponse>({
        mutation: SIGN_IN,
        variables: {
          email: this.formLogin.value.email,
          password: this.formLogin.value.password,
        },
    }).subscribe(({ data }) => {
      console.log(data, 'Login success')
       },(error) => {
         console.log('there was an error sending the query', error);
       });
    }
  }

}
