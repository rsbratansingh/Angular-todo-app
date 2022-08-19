import { Component, OnInit } from '@angular/core';
import {serverTimestamp } from 'firebase/firestore';
import { AuthService } from '../Services/auth.service';
import { CrudService } from '../Services/crud.service';
@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {
  Task: any;
  Name: string;
  GetUserId: any;
  UserId: string;
  constructor(public crudservice: CrudService, public authservice: AuthService) {
  }
  ngOnInit() {
    this.authservice.verified=true;
    if (this.authservice.googleFlag === true) {
      this.UserId = this.authservice.googleId;
      this.UserId = localStorage.getItem('googleId');
      console.log(this.UserId);
      this.getTasks(this.UserId);
    }
    else {
      this.UserId = this.authservice.getId();
      console.log(this.UserId);
      this.getTasks(this.UserId);
    }
  }
  getTasks(userID) {
    console.log(userID);
    this.crudservice.get_Alldone(userID).subscribe(data => {
      this.Task = data;
    });
  }
  CreateRecord() {
    let Record = {};
    Record['name'] = this.Name;
    Record['timestamp'] = serverTimestamp();
    this.crudservice.create_Newdone(this.UserId, Record).then(res => {
      this.Name = "";
      console.log(res);
    }).catch(error => {
      console.log(error);
    });
  }
  Deletedone(record_id) {
    this.crudservice.delete_done(this.UserId, record_id);
  }
}
