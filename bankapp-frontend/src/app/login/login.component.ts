import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginError: string = '';
  loginSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  });

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let acno = this.loginForm.value.acno;
      let password = this.loginForm.value.password;
      // console.log(username);
      this.api.login(acno, password).subscribe(
        (response: any) => {
          // console.log(response);
          alert('Login successful');
          this.loginSuccess = true;
          localStorage.setItem('currentUser', response.currentUser);
          localStorage.setItem('currentBalance', response.currentBalance);
          localStorage.setItem('currentAcno', response.currentAcno);
          localStorage.setItem('token', response.token);
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard');
          }, 2000);
        },
        (response: any) => {
          //error
          this.loginError = response.error.message;

          setTimeout(() => {
            this.loginForm.reset();
            this.loginError = '';
          }, 2000);
        }
      );
    } else {
      alert('Login Invalid');
    }
  }
}
