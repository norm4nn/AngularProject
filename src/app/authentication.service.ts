import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './trips/trips.component';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any;
  persistance: any;
  isLoggedIn!: boolean;
  currentID: any;
  currentRole: any;
  currentNick: any;
  usersRef = this.db.collection('users');
  persistanceRef = this.db.collection('persistance');
  array!: any;
  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFirestore,) {
    this.userData = this.afAuth.authState;
    this.userData.subscribe((user : any) => {
      console.log('user', user?.uid);
      
      this.currentID = user?.uid;
      this.usersRef.doc(this.currentID + '').valueChanges().subscribe(user => {
        this.currentRole = (user) ? (user as User).role : undefined;
      });
      this.usersRef.doc(this.currentID + '').valueChanges().subscribe(user => {
        this.currentNick = (user) ? (user as User).nick : undefined;
      });
    })

    // this.usersRef.doc(this.currentID + '').get().subscribe(user => {
    //   this.currentRole = user.exists ? (user.data() as User).role : undefined;
    //   console.log('role', this.currentRole);
    // });
    this.persistanceRef.doc('0').valueChanges().subscribe(change => {
      this.persistance = (change as {current: any}).current;
    
    }) 
    this.isLogged();

    this.userData.subscribe((user1 : any) => {
      this.usersRef.doc(user1.uid).valueChanges().subscribe((user: any) => {
        this.array = user.reviewed;
        console.log(this.array);
        // array.push();
        
      });
    })
    // .subscribe((user) => {
    //   if (user) {
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user')!);
    //   } else {
    //     localStorage.setItem('user', 'null');
    //     JSON.parse(localStorage.getItem('user')!);
    //   }
    // });
  }

  isLogged() {
    this.userData.subscribe((user : any) => {
      // console.log('user', user?.email);
      if (user != null) 
        this.isLoggedIn = true;
      else
        this.isLoggedIn = false;
    })
    
    
  }
 
  // Sign up with email/password
  SignUp(email : string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        
        // console.log(result.user);
        this.usersRef.doc(result.user?.uid + '').set({
          uid: result.user?.uid,
          nick: result.user?.email?.split('@')[0],
          email: result.user?.email,
          role: 'customer',
          banned: false,
          reviewed: [],
        } as User );
        this.router.navigate(['/home']);
        window.alert('You have been successfully registered!');
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign in with email/password
  SignIn(email : string, password : string) {
    this.afAuth.setPersistence(this.persistance).then(() =>{
      this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user?.email);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
    });
  }

  SignOut() {
    this.afAuth.setPersistence(this.persistance).then(() =>{
      this.afAuth
      .signOut();
      this.router.navigate(['/home']);
    });
  }

  getUsers() : Observable <any> {
    return this.usersRef.valueChanges();
  }

  updateBan(uid : string, isBanned : boolean ) {
    
    this.usersRef.doc(uid).update({banned: isBanned});
  }

  updateRole(uid : string, role : string) {
    this.usersRef.doc(uid).update({role: role});
  }

  updatePersistance(newPersistance: string) {
    this.persistance = newPersistance;
    this.persistanceRef.doc('0').update({current: this.persistance});
    this.afAuth.setPersistence(this.persistance);
  }

  getCurrentUser() : Observable <any> {
    
    return this.userData;
    // return this.usersRef.doc(this.currentID).valueChanges(); 
  }

  passIdToReviewe(id: number) {
    this.array.push(id);
    this.userData.subscribe((user1 : any) => {
      this.usersRef.doc(user1.uid).update({reviewed: this.array});
  });
  }

}