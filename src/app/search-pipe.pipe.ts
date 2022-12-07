import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Course } from './trips/trips.component';


@Pipe({ name: 'searchPipe' })
export class SearchPipe implements PipeTransform {

  datepipe = new DatePipe('en-US');
  checkingFrom!: Date;
  checkingTo!: Date;

  transform(courses: Course[], searchName: string, searchCountry: string, searchDateFrom: Date,
    searchDateTo: Date, searchMinPrice: number, searchMaxPrice: number, searchMinRating: number, searchMaxRating: number): Course[] {
    if (!courses)
      return [];
    

    searchName = searchName.toLowerCase();

    searchCountry = searchCountry.toLowerCase();
    searchDateFrom = new Date(searchDateFrom);
    searchDateTo = new Date(searchDateTo);
    searchDateFrom.setHours(0, 0, 0, 0);
    searchDateTo.setHours(23, 59, 59);
      
   
    return courses.filter(course => {
      
      return (!searchName || course.name.toLowerCase().includes(searchName)) //TU ŻLE
      && (!searchCountry || course.country.toLowerCase().includes(searchCountry))
      && (new Date(course.fromDate) >= new Date(searchDateFrom) && new Date(course.toDate) <= new Date(searchDateTo))
      && (course.price >= searchMinPrice && course.price <= searchMaxPrice)
      && (course.rating >= searchMinRating && course.rating <= searchMaxRating);
    }); 
  }
}