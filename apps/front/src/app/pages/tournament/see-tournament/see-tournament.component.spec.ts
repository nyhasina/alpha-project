import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeTournamentComponent } from './see-tournament.component';

describe('SeeTournamentComponent', () => {
  let component: SeeTournamentComponent;
  let fixture: ComponentFixture<SeeTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeTournamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
