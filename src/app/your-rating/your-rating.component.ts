import { query } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';


export interface Post {
  rate: number;
  nick: string;
  name: string;
  date: Date;
  description: string;
}

@Component({
  selector: 'app-your-rating',
  templateUrl: './your-rating.component.html',
  styleUrls: ['./your-rating.component.css']
})
export class YourRatingComponent implements OnInit {
  isChecked = [false, false, false, false, false];
  setted = [false, false, false, false, false];
  errMsg = ''
  @Output() rateEvent = new EventEmitter<Post>();
  oldRate = -1;
  rated = false;
  constructor(private formBuilder : FormBuilder) { }
  modelForm!: FormGroup;
  formErrors = {
    nick: '',
    name: '',
    date: '',
    description: '',
  };

  private validationMessages = {
    nick: {
      required: 'Nazwa jest wymagana.',
      pattern: 'dozwolone tylko litery i cyfry.'
    },
    name: {
      required: 'Nazwa wycieczki jest wymagana.',
      pattern: 'Dozwolone tylko litery.'
    },


  }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      nick: ['', [Validators.required, Validators.pattern('^[ ]*?(([A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]+)?([ ]+)?)+$')]],
      name: ['', [Validators.required, Validators.pattern('^[ ]*?(([A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+)?([ ]+)?)+$')]],
      date: [''],
    });
    
    this.modelForm.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.onControlValueChanged();
    });

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
    // this.rateEvent.emit(i+1);
    this.oldRate = i + 1;
    this.rated = true;
  }

  submit() {
    const nickEl = document.querySelector('#nick') as HTMLInputElement;
    const nameEl = document.querySelector('#name') as HTMLInputElement;
    const dateEl = document.querySelector('#date') as HTMLInputElement;
    const textAreaEl = document.querySelector('textarea') as HTMLTextAreaElement;

    const nick = nickEl.value;
    const name = nameEl.value;
    const date = new Date(dateEl.value);
    const textArea = textAreaEl.value;
    if (!this.rated) {
      this.errMsg = "Wycieczka musi zostać oceniona";
      return;
    }
    if (textArea.length < 50 || textArea.length > 500) {
      this.errMsg = "Opis musi być dłuższy niż 50 znaków i krótszy niż 500.";
      return;
    }

    const post = {} as Post;

    post.rate = this.oldRate;
    post.nick = nick;
    post.name = name;
    post.date = date;
    post.description = textArea;

    this.rateEvent.emit(post);
    
    nickEl.value = "";
    nameEl.value = "";
    dateEl.value = "";
    textAreaEl.value = "";
    this.oldRate = -1;
    this.errMsg = "";
    this.clicked(-1);
    this.rated = false;
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
