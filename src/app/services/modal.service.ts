import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ModalConfig {
  isOpen: boolean;
  type: 'quiz' | 'callback' | 'showroom' | null;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalState = new BehaviorSubject<ModalConfig>({ isOpen: false, type: null });
  modalState$ = this.modalState.asObservable();

  openModal(type: 'quiz' | 'callback' | 'showroom') {
    this.modalState.next({ isOpen: true, type });
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
  }

  closeModal() {
    this.modalState.next({ isOpen: false, type: null });
    document.body.style.overflow = ''; // Возвращаем скролл
  }

}
