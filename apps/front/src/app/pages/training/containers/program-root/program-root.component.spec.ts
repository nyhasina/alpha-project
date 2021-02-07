import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramRootComponent } from './program-root.component';

describe('ProgramRootComponent', () => {
  let component: ProgramRootComponent;
  let fixture: ComponentFixture<ProgramRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
