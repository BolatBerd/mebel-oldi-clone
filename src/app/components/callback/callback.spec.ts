import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CallbackComponent } from './callback';
import { ReactiveFormsModule } from '@angular/forms';
import { Email } from '../../services/email';
import { of, throwError } from 'rxjs';

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;
  let emailService: jasmine.SpyObj<Email>;

  beforeEach(async () => {
    const emailServiceSpy = jasmine.createSpyObj('Email', ['sendCallback']);

    await TestBed.configureTestingModule({
      imports: [CallbackComponent, ReactiveFormsModule],
      providers: [
        { provide: Email, useValue: emailServiceSpy }
      ]
    }).compileComponents();

    emailService = TestBed.inject(Email) as jasmine.SpyObj<Email>;
    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.callbackForm.get('name')?.value).toBe('');
    expect(component.callbackForm.get('phone')?.value).toBe('');
  });

  it('should mark fields as invalid when empty and touched', () => {
    const nameControl = component.callbackForm.get('name');
    const phoneControl = component.callbackForm.get('phone');

    nameControl?.markAsTouched();
    phoneControl?.markAsTouched();

    expect(nameControl?.invalid).toBeTruthy();
    expect(phoneControl?.invalid).toBeTruthy();
  });

  it('should accept valid phone number', () => {
    const phoneControl = component.callbackForm.get('phone');
    phoneControl?.setValue('+7 (999) 123-45-67');
    expect(phoneControl?.valid).toBeTruthy();
  });

  it('should send callback when form is valid', () => {
    emailService.sendCallback.and.returnValue(of({ success: true }));

    component.callbackForm.patchValue({
      name: 'John Doe',
      phone: '+7 (999) 123-45-67'
    });

    component.submitCallback();

    expect(emailService.sendCallback).toHaveBeenCalledWith('John Doe', '+7 (999) 123-45-67');
  });

  it('should set isSubmitted to true on successful submission', (done) => {
    emailService.sendCallback.and.returnValue(of({ success: true }));

    component.callbackForm.patchValue({
      name: 'John Doe',
      phone: '+7 (999) 123-45-67'
    });

    component.submitCallback();

    setTimeout(() => {
      expect(component.isSubmitted).toBeTruthy();
      done();
    }, 100);
  });

  it('should handle submission error', () => {
    emailService.sendCallback.and.returnValue(throwError(() => new Error('Network error')));
    spyOn(console, 'error');

    component.callbackForm.patchValue({
      name: 'John Doe',
      phone: '+7 (999) 123-45-67'
    });

    component.submitCallback();

    expect(console.error).toHaveBeenCalled();
    expect(component.isLoading).toBeFalsy();
  });

  it('should not submit when form is invalid', () => {
    component.callbackForm.patchValue({
      name: 'J',
      phone: 'invalid'
    });

    component.submitCallback();

    expect(emailService.sendCallback).not.toHaveBeenCalled();
  });
});
