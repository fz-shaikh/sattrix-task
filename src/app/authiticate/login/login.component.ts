import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public username: any;
  public password: any;

  constructor(private router: Router, private service: ApiService) { }

  login() {
    // Add your login logic here
    // For simplicity, just redirect to dashboard on login
    const data = JSON.parse(sessionStorage.getItem('userData')!);
    if (data.username == this.username && data.password == this.password) {
      alert('Login Success...');
      this.router.navigate(['/dashboard']);
      this.service.editUser(true);
    } else {
      alert('Invalid credentials')
    }
  }
  navigateFun() {
    this.router.navigate(["/register"]);
  }
}
