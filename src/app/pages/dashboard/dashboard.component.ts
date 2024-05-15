import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private route: Router) {

  }
  navigateFun1() {
    this.route.navigate(["/user"]);
  }
  navigateFun2() {
    this.route.navigate(["/list"]);
  }
}
