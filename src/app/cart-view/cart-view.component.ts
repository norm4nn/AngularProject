import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../cart-service.service';
import { CoursesService } from '../courses.service';
import { DateService } from '../date.service';
import { Course } from '../trips/trips.component';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  courses!: Course[];
  currencyType = this.dateService.currency;
  constructor(private coursesService: CoursesService, private dateService: DateService) { }

  ngOnInit(): void {
    this.coursesService.getReserved().subscribe(change => {
      this.courses = []
      for(let course of change) {
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
        });
      }
    })
  }

  add(course : Course) {
    course.reserved += 1;
    course.reserved = Math.min(course.availableSpots, course.reserved);

    this.coursesService.updateReserved(course.id, course.reserved);
  }

  subtract(course : Course) {
  
    course.reserved -= 1;
    course.reserved = Math.max(0, course.reserved);
    this.coursesService.updateReserved(course.id, course.reserved);

  }

  delete(course : Course) {
    this.coursesService.updateReserved(course.id, 0);
    this.courses = this.courses.filter((elem) => {
      return elem !== course;
    });
  }

  buy(course : Course) {
    this.coursesService.passToBought(course);
    this.coursesService.updateReserved(course.id, 0);
  }
  

}
