import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotedataComponent } from './admin-notedata.component';

describe('AdminNotedataComponent', () => {
  let component: AdminNotedataComponent;
  let fixture: ComponentFixture<AdminNotedataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNotedataComponent]
    });
    fixture = TestBed.createComponent(AdminNotedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
