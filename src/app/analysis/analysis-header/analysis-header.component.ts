import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Store } from '@ngrx/store';

import * as AnalysisActions from '../store/analysis.actions';

@Component({
  selector: 'app-analysis-header',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './analysis-header.component.html',
  styleUrl: './analysis-header.component.css',
})
export class AnalysisHeaderComponent {
  private store = inject(Store);

  onSetIds(e: Event) {
    this.store.dispatch(
      AnalysisActions.setIds({ ids: (e.target as HTMLInputElement).value }),
    );
  }

  onSetSubjects(e: Event) {
    this.store.dispatch(
      AnalysisActions.setSubjects({
        subjects: (e.target as HTMLInputElement).value,
      }),
    );
  }
}
