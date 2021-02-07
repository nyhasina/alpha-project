import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticRootComponent } from './statistic-root.component';

describe('StatisticRootComponent', () => {
  let component: StatisticRootComponent;
  let fixture: ComponentFixture<StatisticRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
