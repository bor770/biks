import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { DeployedExamResult } from '../data.model';
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
  store = inject(Store);

  ngOnInit(): void {
    this.examResults$ = this.store.select(
      ResultsSelectors.selectDeployedExamResults,
    );
  }
}
