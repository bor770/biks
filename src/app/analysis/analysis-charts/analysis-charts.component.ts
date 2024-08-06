import { Component } from '@angular/core';

import { Chart1Component } from './chart-1/chart-1.component';
import { Chart2Component } from './chart-2/chart-2.component';
import { Chart3Component } from './chart-3/chart-3.component';

@Component({
  selector: 'app-analysis-charts',
  standalone: true,
  imports: [Chart1Component, Chart2Component, Chart3Component],
  templateUrl: './analysis-charts.component.html',
  styleUrl: './analysis-charts.component.css',
})
export class AnalysisChartsComponent {}
