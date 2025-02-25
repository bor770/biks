import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDetailsComponent } from './data-details.component';

describe('DataDetailsComponent', () => {
  let component: DataDetailsComponent;
  let fixture: ComponentFixture<DataDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
