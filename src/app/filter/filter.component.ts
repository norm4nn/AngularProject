import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { DatePipe } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  conditionForm!: FormGroup;

  datepipe = new DatePipe('en-US');
  name = '';
  country = '';
  @Input() fromDate!: Date;
  @Input() toDate!: Date;
  @Input() minPrice!: number;
  @Input() maxPrice!: number;
  @Input() minRating!: number;
  @Input() maxRating!: number;
  
  @Output() formEvent = new EventEmitter<FormGroup>();
  
  slide = [
  { right: '1vw' },
  { right: '-50vw' }
  ];


  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {

    this.conditionForm.valueChanges.pipe(debounceTime(200)).subscribe(() => {
      this.onControlValueChanged();
    });
   
    this.onControlValueChanged();
  }

  ngOnChanges() {
    this.maxRating =  Math.floor(this.maxRating);
    this.minRating =  Math.floor(this.minRating);

    this.conditionForm = this.formBuilder.group({
      
      name: '',
      country: '',
      fromDate: this.datepipe.transform(this.fromDate, 'shortDate'),
      toDate: this.datepipe.transform(this.toDate, 'shortDate'),
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      minRating: this.minRating,
      maxRating: this.maxRating
    });
    
  }
  
  ngDoCheck() {
    this.onControlValueChanged();
  }

  onControlValueChanged() {
    this.formEvent.emit(this.conditionForm);
  }

  hide() {
    const containerEl = document.getElementById('container-filter');
    containerEl?.animate(this.slide, {duration: 1000, iterations: 1, fill: 'both'});
  }

  show() {
    const containerEl = document.getElementById('container-filter');
    containerEl?.animate(this.slide, {duration: 300, iterations: 1, fill: 'both', direction:'reverse'});
  }
}


