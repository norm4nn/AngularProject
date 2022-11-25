import { Pipe, PipeTransform } from '@angular/core';
import { Course } from './trips/trips.component';

@Pipe({
  name: 'selectMinMax'
})
export class SelectMinMaxPipe implements PipeTransform {

  transform(courses: Course[], course: Course): number {
    
    let coursemaxPrice = courses.filter(o => o.price === Math.max.apply(null,courses.map(o => o.price)))[0];
    let courseminPrice = courses.filter(o => o.price === Math.min.apply(null,courses.map(o => o.price)))[0];
    if (course === courseminPrice)
      return -1;
    if (course === coursemaxPrice)
      return 1;
    
    return 0;
  }

}
