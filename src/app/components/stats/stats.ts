import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatItem {
  number: string;
  label: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.html',
  styleUrls: ['./stats.scss']
})
export class StatsComponent {
  stats: StatItem[] = [
    { number: '33 года', label: 'опыта производства' },
    { number: '6915', label: 'довольных клиентов' },
    { number: '0%', label: 'честная рассрочка' },
    { number: '3 уровня', label: 'гарантии на кухню' }
  ];
}
