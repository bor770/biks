import { Component, input } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent {
  categories = input.required<(number | string)[]>();
  data = input.required<number[]>();
  heading = input.required<string>();
}
