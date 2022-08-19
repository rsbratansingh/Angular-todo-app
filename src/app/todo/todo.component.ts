import { Component, OnInit } from '@angular/core';
import 'firebase/firestore';
import { serverTimestamp} from 'firebase/firestore';
import { AuthService } from '../Services/auth.service';
import { CrudService } from '../Services/crud.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  Task: any;
  GetUserId: any;
  Name: string;
  UserId: string;
  UserData: any;
  constructor(public crudservice: CrudService, public authservice: AuthService) { }
  ngOnInit() {
    this.authservice.verified=true;
    if (this.authservice.googleFlag === true) { this.UserId = this.authservice.googleId; 
      this.UserId=localStorage.getItem('googleId');
      console.log(this.UserId);
      this.crudservice.get_Alltask(this.UserId).subscribe(data => {
        console.log(data);
        this.Task = data;
      });
    }

    else {
      this.UserId=this.authservice.getId();
      console.log(this.UserId);
      console.log(this.UserId);
      this.crudservice.get_Alltask(this.UserId).subscribe(data => {
        console.log(data);
        this.Task = data;
      });
    }
  }
  CreateRecord() {
    let Record = {};
    console.log(this.UserId);
    Record['name'] = this.Name;
    Record['timestamp'] = serverTimestamp();
    this.crudservice.create_Newtask(this.UserId, Record).then(res => {
      this.Name = "";
      console.log(res);
    }).catch(error => {
      console.log(error);
    });
  }

  EditRecord(Record) {
    Record.isedit = true;
    Record.editname = Record.name;
  }

  Updaterecord(recorddata) {
    let record = {};
    record['name'] = recorddata.editname;
    record['timestamp'] = serverTimestamp();
    this.crudservice.update_task(recorddata.id, record, this.UserId);
    recorddata.isedit = false;
  }

  Deletetask(record_id) {
    this.crudservice.delete_task(this.UserId, record_id);
  }
  Donetask(record, record_id) {
    let Record = {};
    Record['name'] = record['name'];
    Record['timestamp'] = serverTimestamp();
    this.crudservice.create_Newdone(this.UserId, Record).then(res => {
      this.Name = "";
      console.log(res);
    }).catch(error => {
      console.log(error);
    });
    this.crudservice.delete_task(this.UserId, record_id);
  }
}


