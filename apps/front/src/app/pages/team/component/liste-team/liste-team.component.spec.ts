import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTeamComponent } from './liste-team.component';

describe('ListeTeamComponent', () => {
  let component: ListeTeamComponent;
  let fixture: ComponentFixture<ListeTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
