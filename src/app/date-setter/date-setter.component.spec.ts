import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSetterComponent } from './date-setter.component';

describe('DateSetterComponent', () => {
  let component: DateSetterComponent;
  let fixture: ComponentFixture<DateSetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateSetterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
