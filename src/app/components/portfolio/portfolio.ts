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
      image: '../img/Foto-mebel-1.png',
      alt: 'Угловая кухня с деревянными фасадами',
      size: 'large'
    },
    {
      id: 2,
      image: '../img/Foto-mebel-2.png',
      alt: 'Современная белая кухня',
      size: 'small'
    },
    {
      id: 3,
      image: '../img/Foto-mebel-3.png',
      alt: 'Серая кухня с подсветкой',
      size: 'small'
    },
    {
      id: 4,
      image: '../img/Foto-mebel-4.png',
      alt: 'Зеленая кухня в классическом стиле',
      size: 'small'
    },
    {
      id: 5,
      image: '../img/Foto-mebel-5.png',
      alt: 'Белая прямая кухня',
      size: 'small'
    }
  ];

  constructor(private modalService: ModalService) {}

  openQuiz() {
    this.modalService.openModal('quiz');
  }
}
