import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers: new HttpHeaders(),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //register
  register(username: any, acno: any, password: any) {
    const body = {
      username,
      acno,
      password,
    };
    return this.http.post('http://localhost:5000/register', body);
  }

  //login
  login(acno: any, password: any) {
    const body = {
      acno,
      password,
    };
    return this.http.post('http://localhost:5000/login', body);
  }

  //append token
  appendToken() {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('verify-token', token);
      options.headers = headers;
    }
    return options;
  }

  //balance
  getBalance(acno: any) {
    return this.http.get(
      'http://localhost:5000/getBalance/' + acno,
      this.appendToken()
    );
  }

  fundTransfer(toAcno: any, frompswd: any, amount: any) {
    const body = {
      toAcno,
      frompswd,
      amount,
    };
    return this.http.post(
      'http://localhost:5000/fundTransfer',
      body,
      this.appendToken()
    );
  }

  transactionHistory() {
    return this.http.get(
      'http://localhost:5000/transactions',
      this.appendToken()
    );
  }
}
