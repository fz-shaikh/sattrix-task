import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
  showFlag: any;

  constructor(private router: Router, private service: ApiService) { }
  ngOnInit() {
    this.service.castUser.subscribe(user => this.showFlag = user);
  }
  logout() {
    this.service.editUser(false);
  }
}
