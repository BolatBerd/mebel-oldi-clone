import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Review {
  id: number;
  name: string;
  avatar: string;
  text: string;
  rating: number;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.html',
  styleUrls: ['./reviews.scss']
})
export class ReviewsComponent {

  reviews: Review[] = [
    {
      id: 1,
      name: 'Анна и Дмитрий',
      avatar: 'https://i.pravatar.cc/150?img=1',
      text: 'Заказывали угловую кухню с фасадами из эмали. Результат превзошёл все ожидания! Дизайнер учёл все наши пожелания, а монтажники работали аккуратно и быстро. Кухня получилась именно такой, как мы мечтали. Спасибо команде Олди!',
      rating: 5
    },
    {
      id: 2,
      name: 'Елена',
      avatar: 'https://i.pravatar.cc/150?img=5',
      text: 'Долго выбирали производителя, остановились на Олди из-за соотношения цены и качества. Не пожалели ни разу! Кухню изготовили точно в срок, установили за один день. Всё работает идеально, фурнитура качественная. Рекомендую!',
      rating: 5
    }
  ];

  // Массив для генерации звезд рейтинга
  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
