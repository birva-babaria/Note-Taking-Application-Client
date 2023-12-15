import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDataComponent } from './note-data.component';

describe('NoteDataComponent', () => {
  let component: NoteDataComponent;
  let fixture: ComponentFixture<NoteDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteDataComponent]
    });
    fixture = TestBed.createComponent(NoteDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
