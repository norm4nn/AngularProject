import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';
import { CoursesService } from '../courses.service';
import { Course } from '../trips/trips.component';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.css']
})
export class CreateNewComponent implements OnInit {

  modelForm!: FormGroup;

  @Output() formEvent = new EventEmitter<FormGroup>();

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


  constructor(private formBuilder : FormBuilder, private coursesService: CoursesService) { }

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

    this.modelForm.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.onControlValueChanged();
    });
   
    this.onControlValueChanged();
  }

  onSubmit(form : FormGroup) : void {

    this.create(form);
    this.ngOnInit();
  };

  create(form : FormGroup) {
    // console.log(form.value);
    const newcourse = {} as Course;
    newcourse.name = form.value['name'];
    newcourse.country = form.value['country'];
    newcourse.location = form.value['location'];
    newcourse.fromDate = form.value['fromDate'] as Date;
    newcourse.toDate = form.value['toDate'] as Date;
    newcourse.price = parseInt(form.value['price']);
    newcourse.availableSpots = parseInt(form.value['availableSpots']);
    newcourse.description = form.value['description'];
    newcourse.rating = 0;
    newcourse.yourRating = 0;
    newcourse.amountOfRates = 0;
    newcourse.reserved = 0;
    newcourse.imgSrc = '';
    newcourse.id = this.coursesService.getNextId();
    this.coursesService.createCourse(newcourse as Course);

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
