import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CoursesService } from '../courses.service';
import { DateService } from '../date.service';
import { Course } from '../trips/trips.component';

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.css']
})
export class EditViewComponent implements OnInit {
  viewFromIndex = 0;
  maxView = 10;
  courses!: Course[];
  sumOfCourses = 0;
  currencyType = this.dateService.currency;
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

  item$!: Observable<any>;
  constructor(private http: HttpClient, private dateService: DateService, private coursesService: CoursesService) { }

  
  
  ngOnInit(): void {
    // pchniecie danych na firebase gdyby ktos zlosliwie usunał
    // this.http.get<Course[]>('http://localhost:3000/trips').subscribe({
    //   next: data => {
    //     this.courses = data;
    //     data.forEach(course => this.coursesService.createCourse(course))
    //   },
    //   error: err => console.log("Wystąpił błąd przy pobieraniu danych z JSON.", err),
    // });
    this.coursesService.getCourses().subscribe((change: any) => {
      this.courses = [];
      for(let course  of change) {
        this.courses.push({
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
          description: course.description
        })
      }
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

  

  delete(course : Course) {
    this.sumOfCourses -= course.reserved;
    this.coursesService.updateReserved(course.id, 0);
    this.courses = this.courses.filter((elem) => {
      return elem !== course;
    });
    this.ngDoCheck();

  }

  // create(form : FormGroup) {
  //   // console.log(form.value);
  //   const newcourse = {} as Course;
  //   newcourse.name = form.value['name'];
  //   newcourse.country = form.value['country'];
  //   newcourse.location = form.value['location'];
  //   newcourse.fromDate = form.value['fromDate'] as Date;
  //   newcourse.toDate = form.value['toDate'] as Date;
  //   newcourse.price = parseInt(form.value['price']);
  //   newcourse.availableSpots = parseInt(form.value['availableSpots']);
  //   newcourse.description = form.value['description'];
  //   newcourse.rating = 0;
  //   newcourse.yourRating = 0;
  //   newcourse.amountOfRates = 0;
  //   newcourse.reserved = 0;
  //   newcourse.imgSrc = '';
  //   newcourse.id = this.courses.length + 1;
  //   this.coursesService.createCourse(newcourse as Course);
  //   this.findMaxMin();
  //   this.findDateMaxMin();
  // }

  updateFilter(formConditions: FormGroup){
    if (this.courses) {
      this.conditionMaxPrice  = formConditions.value['maxPrice'];
      this.conditionMinPrice  = formConditions.value['minPrice'];
      this.conditionMaxRating = formConditions.value['maxRating'];
      this.conditionMinRating = formConditions.value['minRating'];
      this.conditionFromDate  = formConditions.value['fromDate'];
      this.conditionToDate    = formConditions.value['toDate'];
      this.conditionName      = formConditions.value['name'];
      this.conditionCountry   = formConditions.value['country'];

    }

  }

}
