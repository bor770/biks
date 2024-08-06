import { Component, inject } from '@angular/core';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Store } from '@ngrx/store';

import * as MonitorActions from '../store/monitor.actions';

@Component({
  selector: 'app-monitor-header',
  standalone: true,
  imports: [MatCheckboxModule, MatFormFieldModule, MatInputModule],
  templateUrl: './monitor-header.component.html',
  styleUrl: './monitor-header.component.css',
})
export class MonitorHeaderComponent {
  private store = inject(Store);

  onSetFailed(e: MatCheckboxChange) {
    this.store.dispatch(MonitorActions.setFailed({ failed: e.checked }));
  }

  onSetIds(e: Event) {
    this.store.dispatch(
      MonitorActions.setIds({ ids: (e.target as HTMLInputElement).value }),
    );
  }

  onSetNames(e: Event) {
    this.store.dispatch(
      MonitorActions.setNames({ names: (e.target as HTMLInputElement).value }),
    );
  }

  onSetPassed(e: MatCheckboxChange) {
    this.store.dispatch(MonitorActions.setPassed({ passed: e.checked }));
  }
}
