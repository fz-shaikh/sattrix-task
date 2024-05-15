import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {


  myData: any
  constructor(private route: Router) {
    this.getAllUser();
  }

  getAllUser() {
    const user = JSON.parse(sessionStorage.getItem('myArray')!);
    this.myData = user
    console.log(user)
  }


  onDelete(data: any) {
    console.log(data);
    let existingDataString = sessionStorage.getItem('myArray');
    if (existingDataString) {
      let existingData = JSON.parse(existingDataString);

      let dataIndex = existingData.findIndex((item: any) => item.id === data.id);
      if (dataIndex !== -1) {
        existingData.splice(dataIndex, 1);
        sessionStorage.setItem('myArray', JSON.stringify(existingData));
      } else {
        console.log(`Data with IDnot found.`);
      }
    }
    this.getAllUser();
  }

  sendData(data: any) {
    const dataToSend = data;
    this.route.navigate(['/user', dataToSend]);
  }
}

