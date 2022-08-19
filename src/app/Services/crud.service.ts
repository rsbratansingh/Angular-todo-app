import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Auth } from '@angular/fire/auth';
import { UserProfile } from '../modules/user-profile';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class CrudService implements OnInit {
  id: string;
  newData: Observable<any[]>;
  ngOnInit() {
    this.id = localStorage.getItem('id');
    console.log(this.id);
    this.newData = this.fireservices.collection(`Users/${this.id}/task`).snapshotChanges().pipe(
      map((data) => {
        return data.map(a => {
          const userData = a.payload.doc.data() as any;
          userData.id = a.payload.doc.id;
          console.log(userData);
          return userData;
        })
      })
    )
  }
  constructor(public Auth: Auth, public fireservices: AngularFirestore) { }
  getTasklist() {
    return this.fireservices.collection('Users').doc("2WEyBFyMhlgbMsa8UMXxHjJi3si2").
    collection('task').valueChanges();
  }
  create_User(user: UserProfile) {
    this.fireservices.collection('Users').add(user);
  }

  create_Newtask(userId, Record) {
    return this.fireservices.collection(`Users/${userId}/task`,ref=>ref.orderBy('timestamp','desc')).add(Record);
  }
  create_Newdone(userId, Record) {
    return this.fireservices.collection(`Users/${userId}/done/`,ref=>ref.orderBy('timestamp','desc')).add(Record);
  }
  get_Alldone(userId) {
    console.log(userId);
    return this.fireservices.collection(`Users/${userId}/done/`,ref=>ref.orderBy('timestamp','desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  get_Alltask(userId) {
    console.log(userId);
    return this.fireservices.collection(`Users/${userId}/task/`,ref=>ref.orderBy('timestamp','desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  update_task(recordid, record, userId) {
    this.fireservices.doc(`Users/${userId}/task/${recordid}`).update(record);
  }
  delete_done(userId, record_id) {
    this.fireservices.doc(`Users/${userId}/done/${record_id}`).delete();
  }
  delete_task(userId, record_id) {
    this.fireservices.doc(`Users/${userId}/task/${record_id}`).delete();
  }
}

