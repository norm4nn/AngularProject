import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-your-rating',
  templateUrl: './your-rating.component.html',
  styleUrls: ['./your-rating.component.css']
})
export class YourRatingComponent implements OnInit {
  isChecked = [false, false, false, false, false];
  setted = [false, false, false, false, false];

  @Output() rateEvent = new EventEmitter<number>();
  oldRate = -1;
  constructor() { }

  ngOnInit(): void {
  }

  over(i : number) {
    this.isChecked.forEach((bool, index) => {
      if (index <= i)  
        this.isChecked[index] = true;
      else
        this.isChecked[index] = false;

    });
  }

  clicked(i : number) {
    this.setted.forEach((bool, index) => {
      if (index <= i)  {
        this.setted[index] = true;
        this.isChecked[index] = true;
      }
      else {
        this.setted[index] = false;
        this.isChecked[index] = false;
      }
    });
    this.rateEvent.emit(i+1);
    this.oldRate = i + 1;
  }

  back2normal() {
    this.setted.forEach((bool, index) => {
      this.isChecked[index] = bool;
    });
  }

}
