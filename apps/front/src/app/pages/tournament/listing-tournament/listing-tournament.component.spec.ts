import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingTournamentComponent } from './listing-tournament.component';

describe('ListingTournamentComponent', () => {
  let component: ListingTournamentComponent;
  let fixture: ComponentFixture<ListingTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingTournamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
