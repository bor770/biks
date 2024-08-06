import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorHeaderComponent } from './monitor-header.component';

describe('MonitorHeaderComponent', () => {
  let component: MonitorHeaderComponent;
  let fixture: ComponentFixture<MonitorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
