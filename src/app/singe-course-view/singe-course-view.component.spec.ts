import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingeCourseViewComponent } from './singe-course-view.component';

describe('SingeCourseViewComponent', () => {
  let component: SingeCourseViewComponent;
  let fixture: ComponentFixture<SingeCourseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingeCourseViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingeCourseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
