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

import { DeployedResult } from '../data.model';
import * as DataActions from '../store/data.actions';

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
  result = input.required<DeployedResult>();
  form!: FormGroup;

  constructor(private store: Store) {
    // Update form fields when a new row is selected
    effect(() => {
      const formControls = this.form.controls;
      const result = this.result();

      formControls['address'].setValue(result?.address);
      formControls['city'].setValue(result?.city);
      formControls['country'].setValue(result?.country);
      formControls['date'].setValue(result?.date);
      formControls['dateJoined'].setValue(result?.dateJoined);
      formControls['studentId'].setValue(result?.studentId);
      formControls['email'].setValue(result?.email);
      formControls['grade'].setValue(result?.grade);
      formControls['name'].setValue(result?.name);
      formControls['subject'].setValue(result?.subject);
      formControls['zip'].setValue(result?.zip);
    });
  }

  ngOnInit(): void {
    const result = this.result();

    this.form = new FormGroup({
      address: new FormControl(result?.address),
      city: new FormControl(result?.city),
      country: new FormControl(result?.country),
      date: new FormControl(result?.date),
      dateJoined: new FormControl(result?.dateJoined),
      studentId: new FormControl(result?.studentId, Validators.required),
      email: new FormControl(result?.email),
      grade: new FormControl(result?.grade, Validators.required),
      name: new FormControl(result?.name),
      subject: new FormControl(result?.subject, Validators.required),
      zip: new FormControl(result?.zip),
    });
  }

  onSubmit() {
    const form = this.form;

    if (form.valid) {
      this.store.dispatch(
        DataActions.saveDeployedResult({
          result: { ...form.value, index: this.result().index },
        }),
      );
    }
  }
}
