import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerCall } from './designer-call';

describe('DesignerCall', () => {
  let component: DesignerCall;
  let fixture: ComponentFixture<DesignerCall>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignerCall]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignerCall);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
