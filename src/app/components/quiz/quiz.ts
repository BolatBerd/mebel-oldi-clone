import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Интерфейсы для типизации данных
interface QuizOption {
  id: number;
  text: string;
  icon?: string; // Эмодзи или класс иконки
}

interface QuizQuestion {
  id: number;
  title: string;
  shortTitle: string;
  options: QuizOption[];
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.scss']
})
export class QuizComponent implements OnInit {

  // 1. Данные квиза (Вопросы)
  questions: QuizQuestion[] = [
    {
      id: 1,
      title: 'Выберите планировку кухни',
      shortTitle: 'Планировка',
      options: [
        { id: 1, text: 'Прямая' },
        { id: 2, text: 'Угловая'},
        { id: 3, text: 'П-образная'},
        { id: 4, text: 'С островом'}
      ]
    },
    {
      id: 2,
      title: 'Какая длина кухни?',
      shortTitle: 'Длина',
      options: [
        { id: 1, text: 'До 2 метров' },
        { id: 2, text: '2-3 метра' },
        { id: 3, text: '3-4 метра' },
        { id: 4, text: 'Более 4 метров' }
      ]
    },
    {
      id: 3,
      title: 'Какой материал фасадов предпочитаете?',
      shortTitle: 'Фасады',
      options: [
        { id: 1, text: 'МДФ-пленка' },
        { id: 2, text: 'МДФ-пластик'},
        { id: 3, text: 'Эмаль (краска)' },
        { id: 4, text: 'Нужна консультация'}
      ]
    },
    {
      id: 4,
      title: 'Какой бюджет вы рассматриваете?',
      shortTitle: 'Бюджет',
      options: [
        { id: 1, text: 'До 150 000 ₽' },
        { id: 2, text: '150 000 - 250 000 ₽' },
        { id: 3, text: '250 000 - 400 000 ₽' },
        { id: 4, text: 'Более 400 000 ₽' }
      ]
    }
  ];

  // 2. Состояние квиза
  currentStep: number = 0;
  answers: { [key: number]: number } = {}; // Хранилище ответов: { id_вопроса: id_ответа }
  isQuizCompleted: boolean = false;
  isSubmitted: boolean = false;

  // 3. Форма для сбора контактов (Финальный шаг)
  leadForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.leadForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9\\s\\-\\(\\)]{10,}$')]],
      consent: [false, Validators.requiredTrue] // Галочка согласия
    });
  }

  // --- МЕТОДЫ УПРАВЛЕНИЯ ---

  get currentQuestion(): QuizQuestion {
    return this.questions[this.currentStep];
  }

  get progressPercent(): number {
    // +1 шаг, потому что форма сбора контактов тоже считается шагом
    const totalSteps = this.questions.length + 1;
    return Math.round(((this.currentStep + 1) / totalSteps) * 100);
  }

  getAnswerText(questionId: number): string {
    const optionId = this.answers[questionId];
    const question = this.questions.find(q => q.id === questionId);
    if (!question || optionId === undefined) return 'Не выбрано';

    const option = question.options.find(o => o.id === optionId);
    return option ? `${option.icon || ''} ${option.text}`.trim() : 'Не выбрано';
  }

  selectOption(questionId: number, optionId: number) {
    this.answers[questionId] = optionId;

    // Автоматический переход вперед через небольшую задержку (UX)
    setTimeout(() => {
      if (this.currentStep < this.questions.length - 1) {
        this.nextStep();
      } else {
        // Если это был последний вопрос, показываем форму
        this.isQuizCompleted = true;
      }
    }, 300);
  }

  isSelected(questionId: number, optionId: number): boolean {
    return this.answers[questionId] === optionId;
  }

  nextStep() {
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.isQuizCompleted = false; // Возврат из формы к вопросам
    }
  }

  // Отправка финальной формы
  submitLead() {
    if (this.leadForm.valid) {
      console.log('Отправка заявки:', {
        answers: this.answers,
        contacts: this.leadForm.value
      });
       this.isSubmitted = true;
    } else {
      this.leadForm.markAllAsTouched();
    }
  }

  resetQuiz() {
    this.currentStep = 0;
    this.answers = {};
    this.isQuizCompleted = false;
    this.isSubmitted = false;
    this.leadForm.reset();
    // Прокручиваем к началу квиза
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
