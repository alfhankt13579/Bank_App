import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  registrationForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  });

  registerError: string = '';
  registerSuccess: any = '';

  register() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      let username = this.registrationForm.value.username;
      let acno = this.registrationForm.value.acno;
      let password = this.registrationForm.value.password;
      // console.log(username);
      this.api.register(username, acno, password).subscribe(
        (response: any) => {
          console.log(response);
          alert(response.message);
          this.registerSuccess = response.message;
          setTimeout(() => {
            //redirect to login page
            this.router.navigateByUrl('');
          }, 3000);
        },
        (response: any) => {
          this.registerError = response.error.message;
          setTimeout(() => {
            this.registrationForm.reset();
            this.registerError = '';
          }, 3000);
        }
      );
    } else {
      alert('registration Invalid');
    }
  }
}
