import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { DateService } from '../date.service';
import { Course } from '../trips/trips.component';
import { BoughtCourse } from '../trips/trips.component';


@Component({
  selector: 'app-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.css']
})
export class HistoryViewComponent implements OnInit {

  courses!: BoughtCourse[];
  afterCondition!: boolean;
  duringCondition!: boolean;
  beforeCondition!: boolean;
  currencyType = this.dateService.currency;
  constructor(private coursesService: CoursesService, private dateService: DateService) { }

  ngOnInit(): void {
    this.afterCondition = true;
    this.beforeCondition = true;
    this.duringCondition = true;
    this.coursesService.getBought().subscribe(change => {
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
          description: course.description,
          boughtDate: new Date(course.boughtDate),
          tickets: course.tickets,
          state: course.state,
          msg: course.msg,
        });
      }
    })
    
  }

  getState(course: BoughtCourse) {
    this.coursesService.updateBoughtState(course);
    
  }

  
  updateC() {
    this.courses.forEach(course => this.getState(course));
    // console.log(this.afterCondition, this.duringCondition, this.beforeCondition);
  }


}
