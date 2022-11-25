import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from './trips/trips.component';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private course$ = new BehaviorSubject<any>({});
  private course2remove$ = new BehaviorSubject<any>({});
  private f2remove$ = new BehaviorSubject<any>({});
  selectedCourse$ = this.course$.asObservable(); 
  selected2remove$ = this.course2remove$.asObservable(); 
  forced2remove$ = this.f2remove$.asObservable(); 
  constructor() { }

  pushCourse(course: Course) {
    if (course.amountOfRates >= 0)
      this.course$.next(course);
  }

  removeCourse(course: Course) {

    this.course2remove$.next(course);
  }

  force2remove(course: Course) {
    this.f2remove$.next(course);
  }
}
