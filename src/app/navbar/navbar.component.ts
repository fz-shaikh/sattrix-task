import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private service: ApiService, private router: Router) { }
  logout() {
    this.service.editUser(false);
    this.router.navigate(['/login']);
  }
}
