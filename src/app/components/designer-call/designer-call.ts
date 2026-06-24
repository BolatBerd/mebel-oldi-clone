import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Benefit {
  text: string;
}

@Component({
  selector: 'app-designer-call',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './designer-call.html',
  styleUrls: ['./designer-call.scss']
})
export class DesignerCallComponent implements OnInit {

  benefits: Benefit[] = [
    { text: 'Замер и 3D-проект бесплатно' },
    { text: 'Расчёт стоимости при вас' },
    { text: 'Ни к чему не обязывает' }
  ];

  designerForm!: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.designerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9\\s\\-\\(\\)]{10,}$')]]
    });
  }

  submitForm() {
    if (this.designerForm.valid) {
      console.log('📦 Заявка на замер:', this.designerForm.value);
      this.isSubmitted = true;

      // Здесь будет отправка на сервер
    } else {
      this.designerForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.designerForm.reset();
    this.isSubmitted = false;
  }
}
