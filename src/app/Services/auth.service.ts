import { Injectable} from '@angular/core';
import { Auth, authState} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {GoogleAuthProvider} from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  current = this.fireauth.currentUser;
  googleFlag = false;
  uid: string;
  googleId: string;
  currentUser = authState(this.Auth);
  verified: boolean = false;
  constructor(private Auth: Auth, public fireauth: AngularFireAuth, private router: Router, private fireservice: AngularFirestore) { }
  login(email: any, password: any) {
    this.fireauth.signInWithEmailAndPassword(email, password).then((res) => {
      localStorage.setItem('token', JSON.stringify(res.user.uid));
      let id=localStorage.getItem('token');
      id=id.replace('/"/g','')
      if (res.user?.emailVerified == true) {
        this.fireservice.collection(`Users`).doc(id).set({
            email: email,
            uid: id,
            password: password
          })
        this.router.navigate(['/tasks']);
        this.verified = true;
      }
      else {
        this.verified = false;
        this.router.navigate(['/verify']);
      }
    }, (err: any) => {
      this.verified=false;
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }
  verfiyEmail(email: any, password: any) {
    this.verified=false;
    this.googleFlag=false;
    this.fireauth.createUserWithEmailAndPassword(email, password).then((res: any) => {
      alert('Registration Successful');
      this.sendEmailForVerification(res.user);
      this.router.navigate(['/login']);
    }, (err: any) => {
      this.verified=false;
      alert(err.message);
      this.router.navigate(['/signup']);
    });
  }
  logout() {
    this.verified = false;
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      this.uid = null;
    }, err => {
      alert(err.message);
    });
  }
  forgotPassword(email: string) {
    this.verified = false;
    this.fireauth.sendPasswordResetEmail(email).then((res:any) => {
      this.router.navigate(['/verify']);
      let id=localStorage.getItem('token');
      this.fireservice.collection(`Users`).doc(id).set({
        name: res.user.displayName,
        email: email,
        uid: id,
        password: res.user.password
      })
    }, err => {
      alert('something went wrong');
      console.log(err.message);
    })
  }

  sendEmailForVerification(user: any) {
    this.verified = false;
    console.log(user);
    user.sendEmailVerification().then((res: any) => {
      console.log(res);
      this.router.navigate(['/verify']);
    }, (err: any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }
  googleSignIn() {
    this.verified = true;
    this.googleFlag = true;
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then((res) => {
      let id = JSON.stringify(res.user?.uid).replace(/"/g, '');
      localStorage.setItem('googleId', id);
      console.log(id);
      this.googleId = id;
      let email = res.user.email;
      let name = res.user.displayName;
      let Gp = res.user?.displayName.replace(/"| /g, '');
      if (Gp.length < 6) { Gp.concat("1234"); }
      let password = Gp.substring(0, 6).toLocaleLowerCase();
      this.fireservice.collection(`Users`).doc(id).set({
        name: name,
        email: email,
        uid: id,
        password: password
      })
      this.router.navigate(['/tasks']);
    }, err => {
      this.verified=false;
      alert(err.message);
    });
  }
  getId() {
    return localStorage.getItem('token');
  }
}
