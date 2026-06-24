import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Stage {
  number: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-stages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stages.html',
  styleUrls: ['./stages.scss']
})
export class StagesComponent {
  
  stages: Stage[] = [
    {
      number: 1,
      title: 'Заявка',
      description: 'Оставляете заявку - перезваниваем и уточняем задачу.'
    },
    {
      number: 2,
      title: 'Замер и расчёт',
      description: 'Дизайнер приедет с каталогом и посчитает стоимость при вас.'
    },
    {
      number: 3,
      title: 'Договор',
      description: 'Фиксируем цену и сроки - вы уверены в результате.'
    },
    {
      number: 4,
      title: 'Производство',
      description: 'Изготавливаем вашу кухню на собственной фабрике.'
    },
    {
      number: 5,
      title: 'Доставка и монтаж',
      description: 'Привозим, поднимаем и собираем под ключ.'
    }
  ];
}
