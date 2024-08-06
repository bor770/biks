import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { MonitorData } from '../monitor.model';
import * as MonitorSelectors from '../store/monitor.selectors';

class MonitorDataSource extends DataSource<MonitorData> {
  constructor(private results$: Observable<MonitorData[]>) {
    super();
  }

  connect() {
    return this.results$;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect() {}
}

@Component({
  selector: 'app-monitor-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './monitor-table.component.html',
  styleUrl: './monitor-table.component.css',
})
export class MonitorTableComponent implements OnInit {
  dataSource!: MonitorDataSource;
  displayedColumns = [`id`, `name`, `average`, `exams`];
  private store = inject(Store);

  ngOnInit(): void {
    this.dataSource = new MonitorDataSource(
      this.store.select(MonitorSelectors.selectFilteredResults),
    );
  }
}
