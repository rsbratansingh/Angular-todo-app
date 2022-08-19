import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  constructor(private auth: AuthService) { }
isAuthenticated=false;
  ngOnInit(): void {
  }
  forgotPassword() {
    this.isAuthenticated=true;
    this.auth.forgotPassword(this.email);
    this.email = '';
  }
}
