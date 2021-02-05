import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListRootComponent } from './contact-list-root.component';

describe('ContactListRootComponent', () => {
  let component: ContactListRootComponent;
  let fixture: ComponentFixture<ContactListRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactListRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
