import { Injectable } from '@angular/core';
import { BoughtCourse, Course } from './trips/trips.component';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  currentDate = new Date();
  currency = 'USD';
  constructor() { }

  setDate(date: Date) {
    this.currentDate = new Date(date);
  }
  
  getDate() {
    return new Date(this.currentDate);
  }

  setCourseState(course : Course | BoughtCourse) {
      let result = 1;
      
      if (this.currentDate < new Date(course.fromDate)) 
        result = -1;
      
      else if (this.currentDate <= new Date(course.toDate))
        result = 0;
      

       
      return result;
    }
  
}
