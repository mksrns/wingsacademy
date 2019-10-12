import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStoriesComponent } from './all-stories.component';

describe('AllStoriesComponent', () => {
  let component: AllStoriesComponent;
  let fixture: ComponentFixture<AllStoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllStoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
