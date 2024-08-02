import { Component, OnInit, inject, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Store } from '@ngrx/store';

import * as ResultsActions from '../../shared/results/store/results.actions';

@Component({
  selector: 'app-data-details',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './data-details.component.html',
  styleUrl: './data-details.component.css',
})
export class DataDetailsComponent implements OnInit {
  form!: FormGroup;
  selectedRow = input.required<number>();
  store = inject(Store);

  ngOnInit(): void {
    this.form = new FormGroup({
      address: new FormControl(null),
      city: new FormControl(null),
      country: new FormControl(null),
      dateJoined: new FormControl(null),
      studentId: new FormControl(null, Validators.required),
      email: new FormControl(null),
      grade: new FormControl(null, Validators.required),
      name: new FormControl(null),
      subject: new FormControl(null, Validators.required),
      zip: new FormControl(null),
    });
  }

  onSubmit() {
    const form = this.form;

    if (form.valid) {
      this.store.dispatch(
        ResultsActions.save({
          index: this.selectedRow(),
          newResult: form.value,
        }),
      );
    }
  }
}
