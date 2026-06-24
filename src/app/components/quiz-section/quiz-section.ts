import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from '../quiz/quiz';

@Component({
  selector: 'app-quiz-section',
  standalone: true,
  imports: [CommonModule, QuizComponent],
  templateUrl: './quiz-section.html',
  styleUrls: ['./quiz-section.scss']
})
export class QuizSectionComponent {
  benefits = [
    'Стоимость кухни в 3 вариантах',
    'Каталог фактур и оттенков',
    'Скидка 30% закрепляется за вашим номером',
    'Подарок в конце теста'
  ];
}
