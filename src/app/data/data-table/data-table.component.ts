import { DataSource } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';

import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { DeployedExamResult } from '../data.model';
import * as DataActions from '../store/data.actions';
import * as DataSelectors from '../store/data.selectors';
import * as ResultsSelectors from '../../shared/results/store/results.selectors';

class ResultsDataSource extends DataSource<DeployedExamResult> {
  constructor(private results$: Observable<DeployedExamResult[]>) {
    super();
  }

  connect() {
    return this.results$;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect() {}
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [DatePipe, MatPaginatorModule, MatTableModule, LetDirective],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent implements OnInit {
  amountOfResults$!: Observable<number>;
  dataSource!: ResultsDataSource;
  displayedColumns = [`id`, `name`, `date`, `grade`, `subject`];
  store = inject(Store);
  selectedRow$!: Observable<number>;

  ngOnInit(): void {
    const store = this.store;

    this.dataSource = new ResultsDataSource(
      store.select(DataSelectors.selectPaginatedResults),
    );
    this.amountOfResults$ = store.select(
      ResultsSelectors.selectAmountOfResults,
    );
    this.selectedRow$ = store.select(DataSelectors.selectSelectedRow);
  }

  onPageEvent(e: PageEvent) {
    this.store.dispatch(DataActions.pageEvent({ pageIndex: e.pageIndex }));
  }

  onSelectRow(index: number) {
    this.store.dispatch(DataActions.selectRow({ index }));
  }
}
