import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../shared/comments.service';
import { NotesService } from '../shared/notes.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { comments } from '../interfaces/Comments';
import { Notes } from '../interfaces/Notes';

@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.css']
})
export class NoteDataComponent implements OnInit{
  
  comments: comments[] = [];
  note: Notes = {
    id: 0,
    title: '',
    data: '',
    createddate: new Date(),
    lastmodifieddate: new Date(),
    trashstatus: false,
    userName: '',
    deleteddate: new Date(),
  };

  constructor(public commentservice: CommentsService, public noteservice: NotesService, public toastr: ToastrService, public router: Router, public route: ActivatedRoute){
  }

  ngOnInit(): void {
    const noteId = this.route.snapshot.paramMap.get('id');
    this.getNote(Number(noteId));
    this.getAllComments(Number(noteId));
  }

  saveComment(): void{
    const noteId = this.route.snapshot.paramMap.get('id');
    this.commentservice.addComment(Number(noteId)).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message, "SUCCESS");
        this.getAllComments(Number(noteId));
        this.commentservice.CommentData.reset();
      },
      error: (err: any) => {
        this.toastr.error("Error Adding Comment", "ERROR");
      }
    });
  }

  getNote(id: number): void {
    this.noteservice.getNoteById(id).subscribe({
      next: (res: any) => {
        this.note = res;
      },
      error: (error: any) => {
        console.error("Error fetching note data", error);
      }
    })
  }

  getAllComments(id: number): void {
    this.commentservice.getAllComments(id).subscribe({
      next: (res: any) => {
        this.comments = res;
      },
      error: (error: any) => {
        console.error('Error fetching comments', error);
      }
    });
  }
}
