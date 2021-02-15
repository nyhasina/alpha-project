import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformFormRootComponent } from './platform-form-root.component';

describe('PlatformFormRootComponent', () => {
  let component: PlatformFormRootComponent;
  let fixture: ComponentFixture<PlatformFormRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformFormRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformFormRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
