import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

interface ShowroomLocation {
  address: string;
  name: string;
  hours: string;
}

@Component({
  selector: 'app-showroom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showroom.html',
  styleUrls: ['./showroom.scss']
})
export class ShowroomComponent {

  locations: ShowroomLocation[] = [
    {
      address: 'ул. 30 лет Победы, 7/5',
      name: 'салон «Муслим-Мебель»',
      hours: '10:00-21:00'
    },
    {
      address: 'ул. Газовиков, 40',
      name: 'салон «Муслим-Мебель»',
      hours: '10:00-21:00'
    }
  ];

  constructor(private modalService: ModalService) {}

  openShowroomModal() {
    this.modalService.openModal('callback');
  }
}
