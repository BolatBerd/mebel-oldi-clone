import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  modalService: ModalService = inject(ModalService);

  isMobileMenuOpen = false;
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

 openQuizModal() {
    this.modalService.openModal('quiz');
    this.isMobileMenuOpen = false; // Закрываем мобильное меню при открытии модалки
  }

  openCallbackModal() {
    this.modalService.openModal('callback');
    this.isMobileMenuOpen = false;
  }

  closeMenuAndNavigate() {
    this.isMobileMenuOpen = false;
  }
}
