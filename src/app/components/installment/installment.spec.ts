import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Installment } from './installment';

describe('Installment', () => {
  let component: Installment;
  let fixture: ComponentFixture<Installment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Installment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Installment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
