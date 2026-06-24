import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

interface Advantage {
  icon: string;
  text: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class Hero {
  advantages: Advantage[] = [
    { icon: '✓', text: 'Бесплатный замер и 3D-проект' },
    { icon: '0%', text: 'Рассрочка без переплат' },
    { icon: '14', text: 'Срок изготовления от 14 дней' },
    { icon: '3', text: 'Три уровня гарантии' }
  ];

  constructor(private modalService: ModalService) {}

  openQuizModal() {
    this.modalService.openModal('quiz');
  }

  scrollToPortfolio() {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
