import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  adminDeleteNote(noteId: number){
    return this.http.delete(environment.baseUrl + "/Admin/DeleteNote/" + noteId);
  }

  adminDeleteComment(CommentId: number){
    return this.http.delete(environment.baseUrl + "/Admin/DeleteComment/" + CommentId);
  }
}
