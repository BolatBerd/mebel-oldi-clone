import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface InstallmentFeature {
  value: string;
  label: string;
}

@Component({
  selector: 'app-installment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './installment.html',
  styleUrls: ['./installment.scss']
})
export class InstallmentComponent {

  features: InstallmentFeature[] = [
    {
      value: '0%',
      label: 'без переплат'
    },
    {
      value: '+1 мес',
      label: 'первый платёж'
    },
    {
      value: 'до 36',
      label: 'месяцев'
    }
  ];
}
