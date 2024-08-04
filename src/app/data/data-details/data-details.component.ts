import { Component, OnInit, effect, input } from '@angular/core';
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
import { DeployedExamResult } from '../data.model';

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
  examResult = input.required<DeployedExamResult>();
  form!: FormGroup;
  realIndex = input.required<number>();
  selectedRow = input.required<number>();

  constructor(private store: Store) {
    effect(() => {
      const formControls = this.form.controls;
      const examResult = this.examResult();

      formControls['address'].setValue(examResult?.address);
      formControls['city'].setValue(examResult?.city);
      formControls['country'].setValue(examResult?.country);
      formControls['dateJoined'].setValue(examResult?.dateJoined);
      formControls['studentId'].setValue(examResult?.studentId);
      formControls['email'].setValue(examResult?.email);
      formControls['grade'].setValue(examResult?.grade);
      formControls['name'].setValue(examResult?.name);
      formControls['subject'].setValue(examResult?.subject);
      formControls['zip'].setValue(examResult?.zip);
    });
  }

  ngOnInit(): void {
    const examResult = this.examResult();

    this.form = new FormGroup({
      address: new FormControl(examResult?.address),
      city: new FormControl(examResult?.city),
      country: new FormControl(examResult?.country),
      dateJoined: new FormControl(examResult?.dateJoined),
      studentId: new FormControl(examResult?.studentId, Validators.required),
      email: new FormControl(examResult?.email),
      grade: new FormControl(examResult?.grade, Validators.required),
      name: new FormControl(examResult?.name),
      subject: new FormControl(examResult?.subject, Validators.required),
      zip: new FormControl(examResult?.zip),
    });
  }

  onSubmit() {
    const form = this.form;

    if (form.valid) {
      this.store.dispatch(
        ResultsActions.save({
          index: this.realIndex(),
          newResult: form.value,
        }),
      );
    }
  }
}
