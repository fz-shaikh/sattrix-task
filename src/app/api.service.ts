import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private user = new BehaviorSubject<boolean>(false);
  castUser = this.user.asObservable();

  editUser(newUser: any) {
    this.user.next(newUser);
  }

}
