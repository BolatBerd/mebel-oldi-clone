import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quiz } from './quiz';

describe('Quiz', () => {
  let component: Quiz;
  let fixture: ComponentFixture<Quiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quiz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Quiz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a consent checkbox for the lead form', () => {
    fixture.detectChanges();

    const consentCheckbox = fixture.nativeElement.querySelector('input[type="checkbox"][formControlName="consent"]');

    expect(consentCheckbox).toBeTruthy();
  });
});
