import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { ApexChart, NgApexchartsModule } from 'ng-apexcharts';

import * as AnalysisSelectors from '../../store/analysis.selectors';

@Component({
  selector: 'app-chart-3',
  standalone: true,
  imports: [LetDirective, NgApexchartsModule],
  templateUrl: './chart-3.component.html',
  styleUrl: './chart-3.component.css',
})
export class Chart3Component implements OnInit {
  averagesBySubject$!: Observable<number[]>;
  chart: ApexChart = { type: `bar` };
  subjectsToShow$!: Observable<string[]>;
  private store = inject(Store);

  ngOnInit(): void {
    const store = this.store;

    this.averagesBySubject$ = store.select(
      AnalysisSelectors.selectAveragesBySubject,
    );
    this.subjectsToShow$ = store.select(AnalysisSelectors.selectSubjects);
  }
}
