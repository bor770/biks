import { DataSource } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';

import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { DeployedResult, PAGE_SIZE } from '../data.model';
import * as DataActions from '../store/data.actions';
import * as DataSelectors from '../store/data.selectors';

class ResultsDataSource extends DataSource<DeployedResult> {
  constructor(private results$: Observable<DeployedResult[]>) {
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
  PAGE_SIZE = PAGE_SIZE;
  amountOfResults$!: Observable<number>;
  dataSource!: ResultsDataSource;
  displayedColumns = [`id`, `name`, `date`, `grade`, `subject`];
  pageIndex$!: Observable<number>;
  selectedRow$!: Observable<number>;
  private store = inject(Store);

  ngOnInit(): void {
    const store = this.store;

    this.dataSource = new ResultsDataSource(
      store.select(DataSelectors.selectPaginatedResults),
    );
    this.amountOfResults$ = store.select(
      DataSelectors.selectAmountOfFilteredResults,
    );
    this.pageIndex$ = store.select(DataSelectors.selectPageIndex);
    this.selectedRow$ = store.select(DataSelectors.selectSelectedRowNumber);
  }

  onPageEvent(e: PageEvent) {
    this.store.dispatch(DataActions.pageEvent({ pageIndex: e.pageIndex }));
  }

  onSelectRow(index: number, rowNumber: number) {
    this.store.dispatch(DataActions.selectRow({ index, rowNumber }));
  }
}
