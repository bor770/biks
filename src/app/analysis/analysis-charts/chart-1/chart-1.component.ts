import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { ApexChart, NgApexchartsModule } from 'ng-apexcharts';

import * as AnalysisSelectors from '../../store/analysis.selectors';

@Component({
  selector: 'app-chart-1',
  standalone: true,
  imports: [LetDirective, NgApexchartsModule],
  templateUrl: './chart-1.component.html',
  styleUrl: './chart-1.component.css',
})
export class Chart1Component implements OnInit {
  averagesById$!: Observable<number[]>;
  chart: ApexChart = { type: `bar` };
  idsToShow$!: Observable<number[]>;
  private store = inject(Store);

  ngOnInit(): void {
    const store = this.store;

    this.averagesById$ = store.select(AnalysisSelectors.selectAveragesById);
    this.idsToShow$ = store.select(AnalysisSelectors.selectsIds);
  }
}
