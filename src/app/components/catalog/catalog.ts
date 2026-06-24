import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

interface KitchenType {
  id: number;
  title: string;
  image: string;
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.scss']
})
export class CatalogComponent {

  kitchenTypes: KitchenType[] = [
    {
      id: 1,
      title: 'Прямая',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'
    },
    {
      id: 2,
      title: 'Угловая',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'
    },
    {
      id: 3,
      title: 'П-образная',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'
    },
    {
      id: 4,
      title: 'С островом',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80'
    }
  ];

  constructor(private modalService: ModalService) {}

  openQuiz() {
    this.modalService.openModal('quiz');
  }
}
