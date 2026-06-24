import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalService, ModalConfig } from '../../services/modal.service';
import { QuizComponent } from '../quiz/quiz';

@Component({
  selector: 'app-modal-wrapper',
  standalone: true,
  imports: [CommonModule, QuizComponent],
  templateUrl: './modal-wrapper.html',
  styleUrls: ['./modal-wrapper.scss']
})
export class ModalWrapperComponent implements OnInit, OnDestroy {
  modalConfig: ModalConfig = { isOpen: false, type: null };
  private subscription!: Subscription;

  private modalService: ModalService = inject(ModalService);

  // constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.subscription = this.modalService.modalState$.subscribe(config => {
      this.modalConfig = config;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.modalService.closeModal();
  }

  onOverlayClick(event: Event) {
    // Закрываем только при клике на overlay, а не на контент
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
