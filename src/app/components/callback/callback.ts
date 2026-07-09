import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Email } from '../../services/email';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './callback.html',
  styleUrls: ['./callback.scss']
})
export class CallbackComponent implements OnInit {
  callbackForm!: FormGroup;
  isSubmitted = false;
  isLoading = false;

  private fb = inject(FormBuilder);
  private emailService = inject(Email);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.callbackForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[7-8]?\s*\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/)]]
    });
  }

  submitCallback() {
    if (this.callbackForm.invalid) {
      Object.keys(this.callbackForm.controls).forEach(key => {
        this.callbackForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    const { name, phone } = this.callbackForm.value;

    this.emailService.sendCallback(name, phone).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isSubmitted = true;
        this.callbackForm.reset();

        // Автоматически закрываем через 3 секунды
        setTimeout(() => {
          this.isSubmitted = false;
        }, 3000);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Ошибка отправки:', error);
        alert('Ошибка при отправке. Попробуйте ещё раз.');
      }
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.callbackForm.get(fieldName);
    if (control?.hasError('required')) {
      return fieldName === 'name' ? 'Введите ваше имя' : 'Введите номер телефона';
    }
    if (control?.hasError('minlength')) {
      return 'Минимум 2 символа';
    }
    if (control?.hasError('pattern')) {
      return 'Введите корректный номер телефона';
    }
    return '';
  }
}
