import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// import { passwordMatch } from '../validators/passwordMatch';
import { HttpClient } from '@angular/common/http';
import { AuthApiService } from '../auth-service/auth-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  integerRegex = /^\d+$/;
  mobileRegex = /^[7-9][0-9]{0,10}$/;
  emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  yearRegex = /^\d{4}$/
  constructor(
    private http: HttpClient,
    private authapiservice: AuthApiService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  signupForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(32),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern(this.emailRegex),
      ]),
      mobile_number: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(this.mobileRegex),
      ]),
      batch_number: new FormControl('',[
        Validators.required,
        Validators.maxLength(4),
        Validators.minLength(4),
        // Validators.pattern(this.yearRegex),
      ]),
      // password: new FormControl('', [
      //   Validators.required,
      //   Validators.maxLength(32),
      //   Validators.minLength(8),
      // ]),
      // cPassword: new FormControl('', [
      //   Validators.required,
      //   Validators.maxLength(32),
      //   Validators.minLength(8),
      // ]),
    },
    // [passwordMatch('password', 'cPassword')]
  );

  getControl(name: any): AbstractControl | null {
    return this.signupForm.get(name);
  }

  signupFn() {
    console.log(this.signupForm.value);

    if (this.signupForm.valid) {
      const body = {
        name: this.signupForm.get('name')?.value,
        email:this.signupForm.get('email')?.value,
        mobile_number: this.signupForm.get('mobile_number')?.value,
        batch_number: this.signupForm.get('batch_number')?.value
        // name: this.signupForm.get('name')?.value,
        // mobile_number: '9849978896',
        // batch_number: '2010',
        // email:this.signupForm.get('email')?.value,
      };
      this.authapiservice.signUp(body).subscribe((res: any) => {
          if(res.success){
            this.toastr.success('Registered Successfully!!!');
            this.router.navigateByUrl('auth/signin')
          }
          else{
            this.toastr.error("Something went wrong, Please try again!");
          }
          // debugger;
        },
        (err: any) => {
          this.toastr.error(err?.error?.message ?? "Something went wrong, Please try again!");
          // debugger;
        });
    }
    else{
      this.toastr.error("Please fill valid information.")
    }
  }
}
