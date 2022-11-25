import { Component, OnInit } from '@angular/core';
import { debounce } from 'rxjs';
import { CartServiceService } from '../cart-service.service';
import { Course } from '../trips/trips.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: []
})
export class CartComponent implements OnInit {
  courses!: Course[];
  sumOfAll!: number;
  slide = [
    { top: '0' },
    { top: '-200vh' }
    ];

  constructor(private cartService: CartServiceService) { }

  ngOnInit(): void {
    this.courses = [];
    this.sumOfAll = 0;
    this.cartService.selectedCourse$.subscribe((value) => {
      if (!this.courses.includes(value))
        this.courses.push(value);
      this.updateSum();
    });

    this.cartService.selected2remove$.subscribe((value) => {
      if (this.courses.includes(value) && value.reserved == 0)
        this.courses = this.courses.filter((course) => {
          return course !== value;
        });
      this.updateSum();
    });

    this.cartService.forced2remove$.subscribe((value) => {
      if (this.courses.includes(value))
        this.courses = this.courses.filter((course) => {
          return course !== value;
        });
      
      this.updateSum();
    });
    this.courses.pop();
  }

  updateSum() {
    this.sumOfAll = 0;
    console.log(this.courses)
    this.courses.forEach((course) => {
      this.sumOfAll += course.reserved * course.price;
    });
    if (!this.sumOfAll)
      this.sumOfAll = 0;
  }


  hide() {
    const containerEl = document.getElementById('cart-container');
    containerEl?.animate(this.slide, {duration: 500, iterations: 1, fill: 'both'});
     
  }

  show() {
    const containerEl = document.getElementById('cart-container');
    containerEl?.animate(this.slide, {duration: 500, iterations: 1, fill: 'both', direction:'reverse'});
    
  }
}
