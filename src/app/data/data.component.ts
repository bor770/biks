import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { DataDetailsComponent } from './data-details/data-details.component';
import { DataHeaderComponent } from './data-header/data-header.component';
import { DataTableComponent } from './data-table/data-table.component';
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
  isRowSelected$!: Observable<boolean>;
  store = inject(Store);

  ngOnInit(): void {
    this.isRowSelected$ = this.store.select(DataSelectors.selectIsRowSelected);
  }
}
