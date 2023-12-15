import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { Notes } from '../interfaces/Notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }

  NoteData = this.fb.group({
    Title: ['', Validators.required],
    Data: ['', Validators.required]
  });

  addingNote()
  {
    var body = {
      Title: this.NoteData.value.Title,
      Data: this.NoteData.value.Data,
    };
    return this.http.post(environment.baseUrl + '/Notes/AddingNote', body);
  }

  getNotes()
  {
    return this.http.get(environment.baseUrl + '/Notes/UserNotes');
  }

  getAllNotes()
  {
    return this.http.get(environment.baseUrl + '/Notes/AllNotes');
  }

  getNoteById(noteId: number){
    return this.http.get(environment.baseUrl + '/Notes/' + noteId);
  }

  editNote(noteId: number, updatedNote: Notes){
    var body = {
      Title: updatedNote.title,
      Data: updatedNote.data,
    };
    return this.http.put(environment.baseUrl + '/Notes/editNote/' + noteId, body);
  }

  deleteNote(noteId: number){
    var body = {};
    return this.http.post(environment.baseUrl + '/Notes/trashNote/' + noteId, body);
  }

  recoverNote(noteId: number){
    var body = {};
    return this.http.post(environment.baseUrl + '/Notes/recoverNote/' + noteId, body);
  }
}
