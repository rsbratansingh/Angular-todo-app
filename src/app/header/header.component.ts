import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  isverified: boolean = false;
  constructor(public authService: AuthService, private router: Router) { }
  logout() {
    this.isAuthenticated = false;
    this.isverified = false;
    let islogout = confirm('Are you sure to want to logout');
    if (islogout === true) {
      this.authService.logout();
    }
    else{return;}
  }

  ngOnInit(): void {
    this.isverified = true;
  }

}
