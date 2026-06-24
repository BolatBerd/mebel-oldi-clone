import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Advantage {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-us.html',
  styleUrls: ['./why-us.scss']
})
export class WhyUsComponent {
  advantages: Advantage[] = [
    {
      icon: '₽',
      title: 'Своё производство',
      description: 'Мы производитель, а не посредник. Можно приехать на производство и всё увидеть.'
    },
    {
      icon: '=',
      title: 'Честная цена',
      description: 'Без накруток и скрытых платежей. Все доп. услуги прописываем в договоре.'
    },
    {
      icon: '⏱',
      title: 'Чёткие сроки',
      description: 'Установим кухню точно в срок или раньше. Изготовление от 14 дней.'
    },
    {
      icon: '✎',
      title: 'Свои дизайнеры',
      description: 'Проект рисует настоящий дизайнер с опытом, а не консультант.'
    },
    {
      icon: '3',
      title: 'Три уровня гарантии',
      description: '24 месяца по договору и 15-20 лет реального срока службы.'
    },
    {
      icon: '★',
      title: '33 года опыта',
      description: 'Тысячи проектов - от простых до нестандартных. Сотни отзывов в сети.'
    }
  ];
}
