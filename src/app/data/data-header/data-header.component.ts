import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';

import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { PAGE_SIZE } from '../data.model';
import * as DataActions from '../store/data.actions';
import * as DataSelectors from '../store/data.selectors';
import * as ResultsActions from '../../shared/results/store/results.actions';

@Component({
  selector: 'app-data-header',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, LetDirective],
  templateUrl: './data-header.component.html',
  styleUrl: './data-header.component.css',
})
export class DataHeaderComponent implements OnInit {
  selectedRow$!: Observable<number>;
  pageIndex$!: Observable<number>;
  store = inject(Store);

  ngOnInit(): void {
    this.pageIndex$ = this.store.select(DataSelectors.selectPageIndex);
    this.selectedRow$ = this.store.select(DataSelectors.selectSelectedRow);
  }

  onAdd() {
    this.store.dispatch(ResultsActions.add());
  }

  onFilter(e: Event) {
    this.store.dispatch(
      DataActions.filter({
        filterString: (e.target as HTMLInputElement).value,
      }),
    );
  }

  onRemove(pageIndex: number, selectedRow: number) {
    this.store.dispatch(
      ResultsActions.remove({ index: pageIndex * PAGE_SIZE + selectedRow }),
    );
  }
}
