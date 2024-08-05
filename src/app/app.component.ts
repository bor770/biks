import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { AnalysisComponent } from './analysis/analysis.component';
import { DataComponent } from './data/data.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatTabsModule, AnalysisComponent, DataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
