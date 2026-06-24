import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrls: ['./faq.scss']
})
export class FaqComponent {

  faqItems: FaqItem[] = [
    {
      question: 'Сколько изготавливается кухня?',
      answer: 'Средний срок изготовления кухни — от 14 до 30 дней в зависимости от сложности проекта, выбранных материалов и фурнитуры. Точные сроки фиксируем в договоре.'
    },
    {
      question: 'Замер и проект правда бесплатные?',
      answer: 'Да, замер и 3D-проект абсолютно бесплатны. Дизайнер приедет в удобное для вас время, сделает замеры, покажет образцы материалов и создаст 3D-визуализацию вашей будущей кухни.'
    },
    {
      question: 'Как работает рассрочка?',
      answer: 'Мы предлагаем рассрочку 0% без переплат на срок до 36 месяцев. Первый платёж через месяц после установки кухни. Оформление занимает 15 минут, требуется только паспорт.'
    },
    {
      question: 'Какие материалы фасадов вы используете?',
      answer: 'МДФ-плёнка, МДФ-пластик, двусторонний пластик и МДФ-эмаль. Дизайнер подберёт оптимальный вариант под ваш бюджет и стиль.'
    },
    {
      question: 'Что входит в гарантию?',
      answer: 'Мы предоставляем три уровня гарантии: 24 месяца на всю кухню по договору, до 10 лет на фурнитуру (Blum, Hettich) и до 20 лет на конструктив корпусов. Реальный срок службы наших кухонь — 15-20 лет.'
    }
  ];

  openIndex: number | null = null;

  toggleFaq(index: number) {
    if (this.openIndex === index) {
      this.openIndex = null;
    } else {
      this.openIndex = index;
    }
  }

  //  Добавляем недостающий метод
  isOpen(index: number): boolean {
    return this.openIndex === index;
  }
}
