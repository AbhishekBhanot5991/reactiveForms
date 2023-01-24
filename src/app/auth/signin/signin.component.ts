import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl,FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthApiService } from '../auth-service/auth-api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
  private rememberMe = true;
  public signinObject: any;
  constructor(private router: Router, private authapiservice: AuthApiService){}

  signinForm = new FormGroup({
    
    email: new FormControl("", [Validators.required, Validators.maxLength(32), Validators.pattern(this.emailRegex)]),
    password: new FormControl("", [Validators.required, Validators.maxLength(32), Validators.minLength(8)]),
    
  })

  ngOnInit() {
    this.signinObject = {
      email: '',
      password: ''
    };
  }
  getControl(name:any): AbstractControl | null
  {
    return this.signinForm.get(name)
  }
  signinFn(){
    console.log(this.signinForm.value);
    if (this.signinForm.valid) {
      const body = {

        email:this.signinForm.get('email')?.value,
        password:this.signinForm.get('password')?.value

      };
      JSON.stringify(body);
      this.authapiservice.signIn(body).subscribe(
        (res: any) => {
          debugger;
        },
        (err: any) => {
          debugger;
        }
      );
    }

  }
  checkboxChangeEvent(event:any) {
    this.rememberMe = event.target.checked;
  }
  signUp(){
    this.router.navigateByUrl('auth/signup')
  }
}
