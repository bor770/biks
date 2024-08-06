import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { DataDetailsComponent } from './data-details/data-details.component';
import { DataHeaderComponent } from './data-header/data-header.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DeployedResult } from './data.model';
import * as DataSelectors from './store/data.selectors';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [
    LetDirective,
    DataDetailsComponent,
    DataHeaderComponent,
    DataTableComponent,
  ],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css',
})
export class DataComponent implements OnInit {
  paginatedResults$!: Observable<DeployedResult[]>;
  selectedRow$!: Observable<number>;
  private store = inject(Store);

  ngOnInit(): void {
    const store = this.store;

    this.paginatedResults$ = store.select(DataSelectors.selectPaginatedResults);
    this.selectedRow$ = store.select(DataSelectors.selectSelectedRowNumber);
  }
}
