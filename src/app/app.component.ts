import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { DataComponent } from './data/data.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatTabsModule, DataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
