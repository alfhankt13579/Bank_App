import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  transferSuccess: any = '';
  transferError: any = '';
  user: any = '';
  balance: any = '';
  currentAcno: any = '';
  isCollapse: boolean = false;
  dashboardLogout: any;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.user = localStorage.getItem('currentUser') || '';
    }
    // if (localStorage.getItem('currentBalance')) {
    //   this.balance = localStorage.getItem('currentBalance') || '';
    // }
    if (localStorage.getItem('currentAcno')) {
      this.currentAcno = localStorage.getItem('currentAcno') || '';
    }

    if (!localStorage.getItem('token')) {
      alert('Please login')
      this.router.navigateByUrl('')
    }
  }

  fundTransferForm = this.fb.group({
    toAcno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    frompswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  });

  collapse() {
    this.isCollapse = !this.isCollapse;
  }

  getBalance() {
    this.api.getBalance(this.currentAcno).subscribe(
      (result: any) => {
        console.log(result.balance);
        this.balance = result.balance;
      },
      (result: any) => {
        alert(result.error.message);
      }
    );
  }

  fundTransferReset() {
    this.fundTransferForm.reset();
  }

  fundTransfer() {
    if (this.fundTransferForm.valid) {
      let creditAcno = this.fundTransferForm.value.toAcno;
      let amount = this.fundTransferForm.value.amount;
      let password = this.fundTransferForm.value.frompswd;
      this.api.fundTransfer(creditAcno, password, amount).subscribe(
        (result: any) => {
          console.log(result);
          this.transferSuccess = result.message;
          setTimeout(() => {
            this.transferSuccess = '';
            this.fundTransferForm.reset();
          }, 5000);
        },
        (result: any) => {
          console.log(result.error.message);
          this.transferError = result.error.message;
          setTimeout(() => {
            this.transferError = '';
            this.fundTransferForm.reset();
          }, 5000);
        }
      );
    } else {
      alert('Add Valid Credentials');
    }
  }

  logout() {
    this.dashboardLogout = true;
    setTimeout(() => {
      //redirect to logout page
      this.router.navigateByUrl('');
    }, 3000);
    localStorage.clear();
  }
}
