import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { DateService } from '../date.service';
import { BoughtCourse, Course } from '../trips/trips.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notificationsQuantity!: number;
  visible!: boolean;
  courses!: BoughtCourse[];
  rangeBefore!: number;
  constructor(private dateService: DateService, private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.rangeBefore = 7;
    this.coursesService.getBought().subscribe(change => {
      this.notificationsQuantity = 0;
      this.visible = false;
      this.courses = [];
      for(let course of change) { 
      // console.log(new Date(new Date(this.dateService.getDate()).setDate(this.dateService.getDate().getDate() + this.rangeBefore)) >= new Date(course.fromDate))
        if (this.dateService.getDate() < new Date(course.fromDate) && 
            new Date(new Date(this.dateService.getDate()).setDate(this.dateService.getDate().getDate() + this.rangeBefore)) >= new Date(course.fromDate)) {
              console.log("weszlo");
          this.notificationsQuantity += 1;
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
          })
      }
    }
    });
  }

  changeVisibility() {
    const msgEl = document.querySelector('.msg-container');
    if (this.courses.length === 0) {
      msgEl?.setAttribute('style', 'opacity: 0; z-index: -1;');
      this.visible = false;
      return;
    }

    if (this.visible)  {
      msgEl?.setAttribute('style', 'opacity: 0; z-index: -1;');
      this.visible = false;
    }
    else {
      msgEl?.setAttribute('style', 'opacity: 1; z-index: 2;')
      this.visible = true;
    }
  }
}
