import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { ChartComponent } from './chart/chart.component';
import * as AnalysisSelectors from '../store/analysis.selectors';

@Component({
  selector: 'app-analysis-charts',
  standalone: true,
  imports: [DragDropModule, LetDirective, ChartComponent],
  templateUrl: './analysis-charts.component.html',
  styleUrl: './analysis-charts.component.css',
})
export class AnalysisChartsComponent implements OnInit {
  averagesById$!: Observable<number[]>;
  averagesBySubject$!: Observable<number[]>;
  ids$!: Observable<number[]>;
  subjects$!: Observable<string[]>;
  private store = inject(Store);

  ngOnInit(): void {
    const store = this.store;

    this.averagesById$ = store.select(AnalysisSelectors.selectAveragesById);
    this.averagesBySubject$ = store.select(
      AnalysisSelectors.selectAveragesBySubject,
    );
    this.ids$ = store.select(AnalysisSelectors.selectsIds);
    this.subjects$ = store.select(AnalysisSelectors.selectSubjects);
  }
}
