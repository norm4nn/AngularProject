import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateService } from '../date.service';

@Component({
  selector: 'app-date-setter',
  templateUrl: './date-setter.component.html',
  styleUrls: ['./date-setter.component.css']
})
export class DateSetterComponent implements OnInit {
  dateEl!: HTMLInputElement;
  @Output() emit = new EventEmitter<any>();
  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    this.dateEl = document.getElementById('date') as HTMLInputElement;
    this.dateEl.value = this.dateService.getDate().toISOString().substr(0, 10);
  }

  valuechange(event : any) {
    this.dateService.setDate(new Date(this.dateEl.value));
    this.emit.emit(event);
  }
}
