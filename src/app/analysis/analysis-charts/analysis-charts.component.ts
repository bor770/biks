import {
  CdkDrag,
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { ChartComponent } from './chart/chart.component';
import { ChartData } from '../analysis.model';
import * as AnalysisSelectors from '../store/analysis.selectors';

@Component({
  selector: 'app-analysis-charts',
  standalone: true,
  imports: [CdkDrag, DragDropModule, LetDirective, ChartComponent],
  templateUrl: './analysis-charts.component.html',
  styleUrl: './analysis-charts.component.css',
})
export class AnalysisChartsComponent implements OnInit {
  averagesById$!: Observable<number[]>;
  averagesBySubject$!: Observable<number[]>;
  charts: ChartData[] = [
    // I didn't understant the difference between Chart1 and Chart2, so I did them both the same
    {
      categoriesSelector: `ids`,
      dataSelector: `averagesById`,
      heading: `Chart 1: Grades average over time for students with Id (for each student)`,
    },
    {
      categoriesSelector: `ids`,
      dataSelector: `averagesById`,
      heading: `Chart 2: Students averages for students with chosen Id`,
    },
    {
      categoriesSelector: `subjects`,
      dataSelector: `averagesBySubject`,
      heading: `Chart 3: Grades averages per subject`,
    },
  ];
  ids$!: Observable<number[]>; // Ids from filter (or all if filter is empty)
  subjects$!: Observable<string[]>; // Subjects from filter (or all if filter is empty)
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

  drop(e: CdkDragDrop<ChartData[]>) {
    moveItemInArray(this.charts, e.previousIndex, e.currentIndex);
  }
}
