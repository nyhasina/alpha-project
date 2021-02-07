import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillGamesRootComponent } from './skill-games-root.component';

describe('SkillGamesRootComponent', () => {
  let component: SkillGamesRootComponent;
  let fixture: ComponentFixture<SkillGamesRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillGamesRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillGamesRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
