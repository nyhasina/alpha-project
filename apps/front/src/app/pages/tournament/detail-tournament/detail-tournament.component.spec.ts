import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTournamentComponent } from './detail-tournament.component';

describe('DetailTournamentComponent', () => {
  let component: DetailTournamentComponent;
  let fixture: ComponentFixture<DetailTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTournamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
