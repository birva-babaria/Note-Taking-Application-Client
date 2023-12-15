import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  
  constructor(private fb:FormBuilder, private http:HttpClient) { }

  CommentData = this.fb.group({
    Content: ['', Validators.required],
  });

  getAllComments(NoteId: number)
  {
    return this.http.get(environment.baseUrl + '/Comments/AllComments/' + NoteId)
  }
  
  addComment(NoteId: number)
  {
    var body = {
      Content: this.CommentData.value.Content,
    }
    return this.http.post(environment.baseUrl + '/Comments/AddComment/' + NoteId, body);
  }
}
