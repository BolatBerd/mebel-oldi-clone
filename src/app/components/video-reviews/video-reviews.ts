import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface VideoReview {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
  author: string;
}

@Component({
  selector: 'app-video-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-reviews.html',
  styleUrls: ['./video-reviews.scss']
})
export class VideoReviewsComponent {

  videoReviews: VideoReview[] = [
    {
      id: 1,
      title: 'Отзыв Муслим-Мебель',
      thumbnail: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
      videoUrl: 'https://rutube.ru/video/12345678',
      author: 'Анна М.'
    },
    {
      id: 2,
      title: 'Отзыв Муслим-Мебель',
      thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      videoUrl: 'https://rutube.ru/video/23456789',
      author: 'Дмитрий К.'
    },
    {
      id: 3,
      title: 'Отзыв Муслим-Мебель',
      thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
      videoUrl: 'https://rutube.ru/video/34567890',
      author: 'Елена С.'
    },
    {
      id: 4,
      title: 'Отзыв Муслим-Мебель',
      thumbnail: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
      videoUrl: 'https://rutube.ru/video/45678901',
      author: 'Сергей В.'
    },
    {
      id: 5,
      title: 'Отзыв Муслим-Мебель',
      thumbnail: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&q=80',
      videoUrl: 'https://rutube.ru/video/56789012',
      author: 'Ольга П.'
    }
  ];

  currentIndex = 0;
  visibleCount = 3;

  get visibleReviews(): VideoReview[] {
    const result: VideoReview[] = [];
    for (let i = 0; i < this.visibleCount; i++) {
      const index = (this.currentIndex + i) % this.videoReviews.length;
      result.push(this.videoReviews[index]);
    }
    return result;
  }

  get totalDots(): number {
    return Math.ceil(this.videoReviews.length / this.visibleCount);
  }

  get activeDotIndex(): number {
    return Math.floor(this.currentIndex / this.visibleCount);
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.videoReviews.length) % this.videoReviews.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.videoReviews.length;
  }

  goTo(index: number) {
    this.currentIndex = index * this.visibleCount;
  }

  openVideo(videoUrl: string) {
    window.open(videoUrl, '_blank');
  }
}
