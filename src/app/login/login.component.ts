import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  Task: any;
  Name: string;
  constructor(private authService: AuthService,
    public afAuth: AngularFireAuth,
    // private crudservice: CrudService,
    private router: Router,
    private toast: HotToastService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })
  }
  onSubmit() {
    if (!this.loginForm.valid) { return; }
    console.log(this.loginForm);
    const email = this.loginForm.value['email'];
    console.log(email);
    const password = this.loginForm.value['password'];
    this.authService.login(email, password);
  }
  signinWithGoogle() {
    this.authService.googleSignIn();
  }
}
