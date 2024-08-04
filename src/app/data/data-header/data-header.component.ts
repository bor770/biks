import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';

import * as DataActions from '../store/data.actions';
import * as DataSelectors from '../store/data.selectors';
import * as ResultsActions from '../../shared/results/store/results.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-header',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, LetDirective],
  templateUrl: './data-header.component.html',
  styleUrl: './data-header.component.css',
})
export class DataHeaderComponent implements OnInit {
  selectedRow$!: Observable<number>;
  store = inject(Store);

  ngOnInit(): void {
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

  onRemove(index: number) {
    this.store.dispatch(ResultsActions.remove({ index }));
  }
}
