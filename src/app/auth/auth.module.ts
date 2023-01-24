import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import {AuthRoutes} from '../auth/auth.routing';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(AuthRoutes)
  ]
})
export class AuthModule { }
