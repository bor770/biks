import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { DeployedExamResult } from '../data.model';
import * as DataActions from '../store/data.actions';
import * as DataSelectors from '../store/data.selectors';
import * as ResultsSelectors from '../../shared/results/store/results.selectors';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent implements OnInit {
  displayedColumns = [`id`, `name`, `date`, `grade`, `subject`];
  examResults$!: Observable<DeployedExamResult[]>;
  selectedRow$!: Observable<number>;
  store = inject(Store);

  ngOnInit(): void {
    const store = this.store;

    this.examResults$ = store.select(
      ResultsSelectors.selectDeployedExamResults,
    );
    this.examResults$.subscribe(console.log);
    this.selectedRow$ = store.select(DataSelectors.selectSelectedRow);
  }

  onSelectRow(index: number) {
    this.store.dispatch(DataActions.selectRow({ index }));
  }
}
