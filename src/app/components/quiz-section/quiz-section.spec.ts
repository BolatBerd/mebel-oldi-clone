import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSection } from './quiz-section';

describe('QuizSection', () => {
  let component: QuizSection;
  let fixture: ComponentFixture<QuizSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
