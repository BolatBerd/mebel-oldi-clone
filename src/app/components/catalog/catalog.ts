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
      image: '../img/straight.png'
    },
    {
      id: 2,
      title: 'Угловая',
      image: '../img/corner_unit.png'
    },
    {
      id: 3,
      title: 'П-образная',
      image: '../img/P-shaped.png'
    },
    {
      id: 4,
      title: 'С островом',
      image: '../img/with_an_island.png'
    }
  ];

  constructor(private modalService: ModalService) {}

  openQuiz() {
    this.modalService.openModal('quiz');
  }
}
