import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs';
import { CoursesService } from '../courses.service';
import { Course } from '../trips/trips.component';

@Component({
  selector: 'app-modify-view',
  templateUrl: './modify-view.component.html',
  styleUrls: ['./modify-view.component.css']
})
export class ModifyViewComponent implements OnInit {

  id!: number;
  course!: Course;
  constructor(private route: ActivatedRoute, private formBuilder : FormBuilder, private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[ ]*?[A-ZŻŹĆĄŚĘŁÓŃ](([A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+)?([ ]+)?)+$')]],
      country: ['', [Validators.required, Validators.pattern('^[ ]*?[A-ZŻŹĆĄŚĘŁÓŃ](([A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+)?([ ]+)?)+$')]],
      location: ['', [Validators.required, Validators.pattern('^[ ]*?[A-ZŻŹĆĄŚĘŁÓŃ](([A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+)?([ ]+)?)+$')]],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[ ]*?[1-9]([0-9]+)?[ ]*?$')]],
      availableSpots: ['', [Validators.required, Validators.pattern('^[ ]*?[1-9]([0-9]+)?[ ]*?$')]],
      description: ['', [Validators.required, Validators.pattern('^[ ]*?([A-ZŻŹĆĄŚĘŁÓŃ]([A-Za-z0-9 !?.,żźćńółęąśŻŹĆĄŚĘŁÓŃ]+)?)[.]([ ]*)?$')]]
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.coursesService.getCourses().subscribe(change => {
      
      for(let course of change) 
        if (course.id == this.id) {
          this.course = course;
          this.modelForm.controls['name'].setValue(course.name);
          this.modelForm.controls['country'].setValue(course.country);
          this.modelForm.controls['location'].setValue(course.location);
          this.modelForm.controls['fromDate'].setValue(course.fromDate);
          this.modelForm.controls['toDate'].setValue(course.toDate);
          this.modelForm.controls['price'].setValue(course.price);
          this.modelForm.controls['availableSpots'].setValue(course.availableSpots);
          this.modelForm.controls['description'].setValue(course.description);
        }
    });
    
    
    
    this.modelForm.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.onControlValueChanged();
    });
   
    this.onControlValueChanged();
  }

  modelForm!: FormGroup;

  formErrors = {
    name: '',
    country: '',
    location: '',
    fromDate: '',
    toDate: '',
    price: '',
    availableSpots: '',
    description: '',
  };

  private validationMessages = {
    name: {
      required: 'Nazwa jest wymagana.',
      pattern: 'Dozwolone tylko litery (pierwsza wielka).'
    },
    country: {
      required: 'Kraj jest wymagany.',
      pattern: 'Dozwolone tylko litery (pierwsza wielka).'
    },
    location: {
      required: 'Lokacja jest wymagana.',
      pattern: 'Dozwolone tylko litery (pierwsza wielka).'
    },
    fromDate: {
      required: 'Data rozpoczęcia jest wymagana.',
    },
    toDate: {
      required: 'Data zakończenia jest wymagana.',
    },
    price: {
      required: 'Cena jest wymagana.',
      pattern: 'Podaj liczbę.'
    },
    availableSpots: {
      required: 'Ilość dostępnych miejsc jest wymagana.',
      pattern: 'Podaj liczbę.'
    },
    description: {
      required: 'Opis jest wymagany.',
      pattern: 'Opis zacznij z wielkiej litery oraz zakończ kropką.'
    }
  }



  onSubmit(form : FormGroup) : void {

    this.update(form);
    this.ngOnInit();
    window.alert("Zmodyfikowano dane wycieczki!");
  };

  update(form : FormGroup) {
    // console.log(form.value);
    this.course.name = form.value['name'];
    this.course.country = form.value['country'];
    this.course.location = form.value['location'];
    this.course.fromDate = form.value['fromDate'] as Date;
    this.course.toDate = form.value['toDate'] as Date;
    this.course.price = parseInt(form.value['price']);
    this.course.availableSpots = parseInt(form.value['availableSpots']);
    this.course.description = form.value['description'];
    this.course.rating = 0;
    this.course.yourRating = 0;
    this.course.amountOfRates = 0;
    this.course.reserved = 0;
    this.course.imgSrc = '';
    this.course.id = this.coursesService.getNextId();
    this.coursesService.update(this.id, this.course as Course);

  }

  onControlValueChanged() {

    const form = this.modelForm;
  
    for (let field in this.formErrors) {
      this.formErrors[field as keyof typeof this.formErrors] = '';
      let control = form.get(field); 
  
      if (control && control.dirty && !control.valid) {
        const validationMessages = this.validationMessages[field as keyof typeof this.validationMessages];
        for (let key in control.errors) 
          this.formErrors[field as keyof typeof this.formErrors] += validationMessages[key as keyof typeof validationMessages] + ' ';
        
      }
    }
  }


}
