import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CartServiceService } from '../cart-service.service';

export interface Course {
  name: string;
  imgSrc: string;  
  country: string;
  location: string;
  fromDate: Date;
  toDate: Date;
  price: number;
  availableSpots: number;
  reserved: number;
  rating: number;
  yourRating: number;
  amountOfRates: number;
  description: string;
}

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
  providers: []
})
export class TripsComponent implements OnInit {
  viewFromIndex = 0;
  maxView = 10;
  courses!: Course[];
  sumOfCourses = 0;

  conditionName = '';
  conditionCountry = '';
  conditionMinPrice!: number;
  conditionMaxPrice!: number;
  conditionMinRating!: number;
  conditionMaxRating!: number;
  conditionFromDate!: Date;
  conditionToDate!: Date;

  realMinPrice!: number;
  realMaxPrice!: number;
  realMinRating!: number;
  realMaxRating!: number;
  realFromDate!: Date;
  realToDate!: Date;

    
  constructor(private http: HttpClient, private cartService: CartServiceService) { }

  ngOnInit(): void {
    this.http.get<Course[]>('http://localhost:3000/trips').subscribe({
      next: data => this.courses = data,
      error: err => console.log("Wystąpił błąd przy pobieraniu danych z JSON.", err),
    });
  }
  
  ngDoCheck() {
      this.findMaxMin();
  }

  findMaxMin() {
    if (this.courses){
      this.realMaxPrice = Math.max.apply(null,this.courses.map(o => o.price));
      this.realMinPrice = Math.min.apply(null,this.courses.map(o => o.price));
      this.realMaxRating = Math.max.apply(null,this.courses.map(o => o.rating));
      this.realMinRating = Math.min.apply(null,this.courses.map(o => o.rating));
      if (!this.realFromDate || !this.realToDate)
        this.findDateMaxMin();
    }
  }

  findDateMaxMin() {
    if (!this.courses)
      return;
    this.realFromDate = new Date(Math.min.apply(null,this.courses.map(o => new Date (o.fromDate).getTime())));
    this.realToDate = new Date(Math.max.apply(null,this.courses.map(o => new Date (o.toDate).getTime())));
  }

  add(course : Course) {

    if (course.reserved < course.availableSpots)
      this.sumOfCourses += 1;

    course.reserved += 1;
    course.reserved = Math.min(course.availableSpots, course.reserved);

    this.cartService.pushCourse(course);


    
    this.findMaxMin();
  }

  subtract(course : Course) {
    
    if (course.reserved > 0) 
      this.sumOfCourses -= 1;
    
    course.reserved -= 1;
    course.reserved = Math.max(0, course.reserved);
    this.cartService.removeCourse(course);
    
    this.findMaxMin();
  }

  delete(course : Course) {
    this.sumOfCourses -= course.reserved;
    this.courses = this.courses.filter((elem) => {
      return elem !== course;
    });
    this.cartService.force2remove(course);
    this.ngDoCheck();

  }

  create(form : FormGroup) {
    // console.log(form.value);
    const newcourse = {} as Course;
    newcourse.name = form.value['name'];
    newcourse.country = form.value['country'];
    newcourse.location = form.value['location'];
    newcourse.fromDate = form.value['fromDate'] as Date;
    newcourse.toDate = form.value['toDate'] as Date;
    newcourse.price = parseInt(form.value['price']);
    newcourse.availableSpots = parseInt(form.value['availableSpots']);
    newcourse.description = form.value['description'];
    newcourse.rating = 0;
    newcourse.yourRating = 0;
    newcourse.amountOfRates = 0;
    newcourse.reserved = 0;
    this.courses.push(newcourse);
    this.findMaxMin();
    this.findDateMaxMin();
  }

  addReview(rate : number, course : Course) {

    let sum = course.amountOfRates * course.rating;
    sum -= course.yourRating;
    sum += rate;
    if (course.yourRating === 0)
      course.amountOfRates += 1;
    course.yourRating = rate;
    course.rating = parseFloat((sum / course.amountOfRates).toFixed(0));
  }  

  updateFilter(formConditions: FormGroup){
    if (this.courses) {
      this.conditionMaxPrice = formConditions.value['maxPrice'];
      this.conditionMinPrice = formConditions.value['minPrice'];
      this.conditionMaxRating = formConditions.value['maxRating'];
      this.conditionMinRating = formConditions.value['minRating'];
      this.conditionFromDate = formConditions.value['fromDate'];
      this.conditionToDate = formConditions.value['toDate'];
      this.conditionName = formConditions.value['name'];
      this.conditionCountry = formConditions.value['country'];
    }

  }
}



