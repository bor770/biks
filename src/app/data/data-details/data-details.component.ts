import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-data-details',
  standalone: true,
  imports: [
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

  ngOnInit(): void {
    this.form = new FormGroup({
      address: new FormControl(),
      city: new FormControl(),
      country: new FormControl(),
      dateJoined: new FormControl(),
      id: new FormControl(),
      email: new FormControl(),
      grade: new FormControl(),
      name: new FormControl(),
      subject: new FormControl(),
      zip: new FormControl(),
    });
  }
}
