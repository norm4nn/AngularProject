import { Component, Input, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { DateService } from '../date.service';
import { Course } from '../trips/trips.component';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  amount!: number;
  sum!: number;
  currencyType = this.dateService.currency;
  constructor(private coursesService: CoursesService, private dateService: DateService) { }

  ngOnInit(): void {
    this.coursesService.getReserved().subscribe(change => {
      this.amount = 0;
      this.sum = 0;
      for(let course of change) {
        this.amount += course.reserved;
        this.sum += course.reserved * course.price;
      } 
    });
  }

}
