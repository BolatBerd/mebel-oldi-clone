import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

interface PortfolioItem {
  id: number;
  image: string;
  alt: string;
  size: 'large' | 'small';
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.scss']
})
export class PortfolioComponent {

  portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      alt: 'Угловая кухня с деревянными фасадами',
      size: 'large'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      alt: 'Современная белая кухня',
      size: 'small'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
      alt: 'Серая кухня с подсветкой',
      size: 'small'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
      alt: 'Зеленая кухня в классическом стиле',
      size: 'small'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&q=80',
      alt: 'Белая прямая кухня',
      size: 'small'
    }
  ];

  constructor(private modalService: ModalService) {}

  openQuiz() {
    this.modalService.openModal('quiz');
  }
}
