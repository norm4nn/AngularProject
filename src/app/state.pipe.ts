import { Pipe, PipeTransform } from '@angular/core';
import { BoughtCourse } from './trips/trips.component';

@Pipe({
  name: 'state'
})
export class StatePipe implements PipeTransform {

  transform(bought: BoughtCourse[], before: boolean, during: boolean, after: boolean): BoughtCourse[] {
    if (!bought)
      return [];      
    
    if (!before)
      bought = bought.filter(course => course.state !== -1)
    if (!during)
      bought = bought.filter(course => course.state !== 0)
    if (!after)
      bought = bought.filter(course => course.state !== 1)
    // console.log(bought.filter(course => {
    //   (before || course.state != -1)  &&
    //   (during || course.state !=  0)  &&
    //   (after  || course.state !=  1)
    // }));
    return bought;
    // return bought.filter(course => {
    //   (before || course.state != -1)  &&
    //   (during || course.state !=  0)  &&
    //   (after  || course.state !=  1)
    // });
  }

}
