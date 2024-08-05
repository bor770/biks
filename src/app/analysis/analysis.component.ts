import { Component } from '@angular/core';

import { AnalysisChartsComponent } from './analysis-charts/analysis-charts.component';
import { AnalysisHeaderComponent } from './analysis-header/analysis-header.component';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [AnalysisChartsComponent, AnalysisHeaderComponent],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css',
})
export class AnalysisComponent {}
