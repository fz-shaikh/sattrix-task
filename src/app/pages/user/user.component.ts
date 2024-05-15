import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  registerForm!: FormGroup;
  userArr: any[] = [];
  formType: any = 'save';
  receivedData: any;
  indexCounter: number = 1;

  constructor(private fb: FormBuilder, private route: Router, private router: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      id: [''],
    });

    this.router.paramMap.subscribe((params: any) => {
      this.receivedData = params
      if (this.receivedData.params) {
        this.editFun(this.receivedData.params);
        // this.registerForm.patchValue(this.receivedData.params)

      }
      console.log(this.receivedData); // This will log the object received
    });
  }


  onSubmit(): void {
    if (!this.registerForm.valid) {
      return;
    } else if (this.formType == 'save') {
      this.saveForm();
    } else if (this.formType == 'update') {
      this.updateDataById();
    }
  }

  // saveForm() {
  //   let storedArray = JSON.parse(sessionStorage.getItem('myArray') || '[]');

  //   this.userArr.push(this.registerForm.value);
  //   this.registerForm.reset();
  //   sessionStorage.setItem('myArray', JSON.stringify(this.userArr));
  // }
  saveForm() {
    // Generate a random ID
    const id = this.generateRandomId();

    // Add the ID to the data object
    this.registerForm.value.id = id;

    // Retrieve existing data from session storage
    let existingDataString = sessionStorage.getItem('myArray');
    let existingData = existingDataString ? JSON.parse(existingDataString) : [];

    // Add the new data to existing data
    existingData.push(this.registerForm.value);

    // Store the updated data back into session storage
    sessionStorage.setItem('myArray', JSON.stringify(existingData));
  }

  generateRandomId(): string {
    // Generate a random alphanumeric string of 6 characters
    return Math.random().toString(36).substring(2, 8);
  }


  // updateForm() {

  // }

  updateDataById() {
    // Retrieve existing data from session storage
    let existingDataString = sessionStorage.getItem('myArray');
    if (existingDataString) {
      let existingData = JSON.parse(existingDataString);

      // Find the data object with the specified ID
      let dataIndex = existingData.findIndex((item: any) => item.id === this.registerForm.value.id);
      if (dataIndex !== -1) {
        // Update the data object
        existingData[dataIndex] = { ...existingData[dataIndex], ...this.registerForm.value };

        // Store the updated data back into session storage
        sessionStorage.setItem('myArray', JSON.stringify(existingData));
        this.formType = 'save'
        this.route.navigateByUrl('/list')
      } else {
        console.log(`Data with IDnot found.`);
      }
    } else {
      console.log('No data found in session storage.');
    }
  }

  editFun(data: any) {
    this.registerForm.patchValue(data);
    this.formType = "update"
  }
}
