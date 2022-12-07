import { core } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../courses.service';
import { DateService } from '../date.service';
import { BoughtCourse, Course } from '../trips/trips.component';
import { Post } from '../your-rating/your-rating.component';

@Component({
  selector: 'app-singe-course-view',
  templateUrl: './singe-course-view.component.html',
  styleUrls: ['./singe-course-view.component.css']
})
export class SingeCourseViewComponent implements OnInit {

  course!: Course | BoughtCourse | undefined;
  imagesEl!: HTMLElement[];
  posts!: Post[];
  isbought!: boolean;
  id!: number;
  currentImg!: number;
  currencyType!: string;
  one2five = [1,2,3,4,5]
  constructor( private dateService: DateService, private coursesService: CoursesService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.posts = [];
    this.currencyType = this.dateService.currency; 
    this.imagesEl = [];
    this.currentImg = 0;
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.coursesService.getCourses().subscribe(change => {
      
      for(let course of change) 
        if (course.id == this.id) {
          this.course = course;
          // console.log(this.images)
        }
    });

    this.coursesService.getBought().subscribe(change => {
      this.isbought = false;
      for(let course of change) 
        if (course.id == this.id) {
          this.course = course;
          this.isbought = true;
        }
    });
    document.querySelector('#first')!.setAttribute('style', 'opacity: 1;');
    this.imagesEl.push(document.querySelector('#first')!);
    this.imagesEl.push(document.querySelector('#second')!);
    this.imagesEl.push(document.querySelector('#third')!);
  }

  slideL() {
    const slide = [
      { right: '-100%'},
      { right: '0%'}
    ];
    const fade = [
      {opacity: '1'},
      {opacity: '0'},
    ]
    this.imagesEl[this.currentImg].animate(fade, {duration: 1000, iterations: 1});
    this.imagesEl[this.currentImg].setAttribute('style', 'z-index: 1;');
    this.currentImg += 1;
    this.currentImg %= 3;
    this.imagesEl[this.currentImg].setAttribute('style', ' z-index: 2; opacity: 1;');
    this.imagesEl[this.currentImg].animate(slide, {duration: 1000, iterations: 1, fill: 'backwards'});
    console.log(this.imagesEl[this.currentImg]);
  }

  slideR() {
    const slide = [
      { left: '-100%',
        right: 'none'     
    },
      { left: '0%'}
    ];
    const fade = [
      {opacity: '1'},
      {opacity: '0'},
    ]
    this.imagesEl[this.currentImg].animate(fade, {duration: 1000, iterations: 1});
    this.imagesEl[this.currentImg].setAttribute('style', 'z-index: 1;');
    this.currentImg -= 1;
    if (this.currentImg < 0)
      this.currentImg = 2;
    this.currentImg %= 3;
    this.imagesEl[this.currentImg].setAttribute('style', ' z-index: 2; opacity: 1;');
    this.imagesEl[this.currentImg].animate(slide, {duration: 1000, iterations: 1, fill: 'backwards'});
    
    console.log(this.imagesEl[this.currentImg]);
  }


  add() {

    if (this.course!.reserved < this.course!.availableSpots)

    this.course!.reserved += 1;
    this.course!.reserved = Math.min(this.course!.availableSpots, this.course!.reserved);

    this.coursesService.updateReserved(this.course!.id, this.course!.reserved);
  }

  subtract() {
    
    if (this.course!.reserved > 0) 
    
    this.course!.reserved -= 1;
    this.course!.reserved = Math.max(0, this.course!.reserved);
    this.coursesService.updateReserved(this.course!.id, this.course!.reserved);

   
  }

  createPost(post: Post) {
    if (this.isbought && (this.course as BoughtCourse).state === 1) {
      this.posts.push(post);
      let newRating = this.course!.rating * this.course!.amountOfRates + post.rate;
      this.course!.amountOfRates += 1;
      this.course!.rating =  newRating / this.course!.amountOfRates;
      this.course!.rating =  Number.parseInt( Number.parseFloat(this.course!.rating + '').toFixed());
      
    }
    else {
      alert("Oceniać możesz tylko zkaupione i odbyte wycieczki!");
    }

    

  }
}
