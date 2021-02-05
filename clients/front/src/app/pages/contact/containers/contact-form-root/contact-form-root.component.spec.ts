import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormRootComponent } from './contact-form-root.component';

describe('ContactFormRootComponent', () => {
  let component: ContactFormRootComponent;
  let fixture: ComponentFixture<ContactFormRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactFormRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
