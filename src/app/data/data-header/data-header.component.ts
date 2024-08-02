import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Store } from '@ngrx/store';
import * as ResultsActions from '../../shared/results/store/results.actions';

@Component({
  selector: 'app-data-header',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './data-header.component.html',
  styleUrl: './data-header.component.css',
})
export class DataHeaderComponent {
  store = inject(Store);

  onAdd() {
    this.store.dispatch(ResultsActions.add());
  }
}
