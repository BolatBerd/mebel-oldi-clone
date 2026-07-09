import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  href: string;
}

interface Location {
  address: string;
  name: string;
  hours: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class FooterComponent {

  navItems: NavItem[] = [
    { label: 'Рассчитать', href: '#quiz' },
    { label: 'Почему мы', href: '#why-us' },
    { label: 'Работы', href: '#portfolio' },
    { label: 'Этапы', href: '#stages' },
    { label: 'Отзывы', href: '#reviews' },
    { label: 'Шоурумы', href: '#showroom' }
  ];

  locations: Location[] = [
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
}
