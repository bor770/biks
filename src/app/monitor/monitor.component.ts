import { Component } from '@angular/core';

import { MonitorHeaderComponent } from './monitor-header/monitor-header.component';
import { MonitorTableComponent } from './monitor-table/monitor-table.component';

@Component({
  selector: 'app-monitor',
  standalone: true,
  imports: [MonitorHeaderComponent, MonitorTableComponent],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.css',
})
export class MonitorComponent {}
