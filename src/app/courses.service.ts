import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { DateService } from './date.service';
import { BoughtCourse, Course } from './trips/trips.component';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  coursesRef = this.db.collection('courses');
  boughtRef = this.db.collection('bought');
  nextId!: number;
  constructor(private db: AngularFirestore, private dateService: DateService) { 
    this.clear();
    this.coursesRef.get().subscribe(change => this.nextId = change.size)
  }

  createCourse(course: Course) {
    this.coursesRef.doc(course.id + '').set({...course});
    //   name: course.name,
    //   country: course.country,
    //   id: course.id,
    //   location: course.location,
    //   fromDate: course.fromDate,
    //   toDate: course.toDate,
    //   imgSrc: course.imgSrc,  
    //   price: course.price,
    //   availableSpots: course.availableSpots,
    //   reserved: course.reserved,
    //   rating: course.rating,
    //   yourRating: course.yourRating,
    //   amountOfRates: course.amountOfRates,
    //   description: course.description
    // });
  }

  getCourses() : Observable<any> {
    return this.coursesRef.valueChanges();
  }

  getReserved() : Observable<any> {
    return this.db.collection('courses', ref => ref.where('reserved', '>', 0)).valueChanges();
  }

  getBought() : Observable<any> {
    return this.boughtRef.valueChanges();
  }

  updateReserved(id: number, reserved1: number ) {
    this.coursesRef.doc(id+'').update({reserved: reserved1});
  }

  update(id: number, course: Course) {
    this.coursesRef.doc(id+'').update({
      name: course.name,
      country: course.country,
      id: course.id,
      location: course.location,
      fromDate: course.fromDate,
      toDate: course.toDate,
      price: course.price,
      availableSpots: course.availableSpots,
      description: course.description
    });
  }

  passToBought(course: Course) {
    let state = this.dateService.setCourseState(course) 
    let msg = "WYCIECZKA ODBYTA";
    if (state === -1)
      msg =  "WYCIECZKA W OCZEKIWANIU";
    else if(state === 0)
      msg = "WYCIECZKA W TRAKCIE";
    let boughtCourse = {
          name: course.name,
          country: course.country,
          id: course.id,
          location: course.location,
          fromDate: course.fromDate,
          toDate: course.toDate,
          imgSrc: course.imgSrc,  
          imgSrc2: course.imgSrc2,  
          imgSrc3: course.imgSrc3,  
          price: course.price,
          availableSpots: course.availableSpots,
          reserved: course.reserved,
          rating: course.rating,
          yourRating: course.yourRating,
          amountOfRates: course.amountOfRates,
          description: course.description,
          boughtDate: this.dateService.getDate().toDateString(),
          tickets: course.reserved,
          state: state,
          msg: msg
    }
    this.boughtRef.doc(course.id + '').set({...boughtCourse});
  }

  updateBoughtState(bCourse: BoughtCourse) {
    const state = this.dateService.setCourseState(bCourse);
    let msg = "WYCIECZKA ODBYTA";
    if (state === -1)
      msg =  "WYCIECZKA W OCZEKIWANIU";
    else if(state === 0)
      msg = "WYCIECZKA W TRAKCIE";

    this.boughtRef.doc(bCourse.id + '').update({state: state, msg: msg});
  }

  getNextId():number {
    this.nextId += 1;
    return this.nextId;
  }

  clear() {
    const ref = this.db.collection('bought');
    ref.get().toPromise().then(res => {
      res?.forEach(element => {
        element.ref.delete();
      });
    });
  }


}
