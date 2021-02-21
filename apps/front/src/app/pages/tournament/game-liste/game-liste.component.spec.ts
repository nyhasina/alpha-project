import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListeComponent } from './game-liste.component';

describe('GameListeComponent', () => {
  let component: GameListeComponent;
  let fixture: ComponentFixture<GameListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
