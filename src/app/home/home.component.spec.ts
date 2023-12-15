// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { HomeComponent } from './home.component';

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [HomeComponent]
//     });
//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { NotesService } from '../shared/notes.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let notesServiceStub: Partial<NotesService>;

  beforeEach(() => {
    notesServiceStub = {
      getNotes: () => of({ notes: [], trash: [] }),
      deleteNote: () => of({}),
      recoverNote: () => of({})
    };

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule, ToastrModule.forRoot()],
      providers: [{ provide: NotesService, useValue: notesServiceStub }]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getNotes on ngOnInit', () => {
    const spy = spyOn(component, 'getNotes').and.callThrough();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should call deleteNote on onDelete', () => {
    const spy = spyOn(component.noteservice, 'deleteNote').and.returnValue(of({}));
    const noteId = 1;
    component.onDelete(noteId);
    expect(spy).toHaveBeenCalledWith(noteId);
  });

  it('should call recoverNote on onRecover', () => {
    const spy = spyOn(component.noteservice, 'recoverNote').and.returnValue(of({}));
    const noteId = 1;
    component.onRecover(noteId);
    expect(spy).toHaveBeenCalledWith(noteId);
  });
});
