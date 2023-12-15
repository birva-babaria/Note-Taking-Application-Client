import { Component } from '@angular/core';
import { NotesService } from '../shared/notes.service';
import { comments } from '../interfaces/Comments';
import { Notes } from '../interfaces/Notes';
import { CommentsService } from '../shared/comments.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../shared/admin.service';

@Component({
  selector: 'app-admin-notedata',
  templateUrl: './admin-notedata.component.html',
  styleUrls: ['./admin-notedata.component.css']
})
export class AdminNotedataComponent {
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
  };;

  constructor(public commentservice: CommentsService, public noteservice: NotesService,public adminservice: AdminService, public toastr: ToastrService, public router: Router, public route: ActivatedRoute){
  }

  ngOnInit(): void {
    const noteId = this.route.snapshot.paramMap.get('id');
    this.getNote(Number(noteId));
    this.getAllComments(Number(noteId));
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

  onDelete(commentId: number): void{
    const noteId = this.route.snapshot.paramMap.get('id');
    this.adminservice.adminDeleteComment(commentId).subscribe({
      next: (res: any) => {
        this.toastr.success("Comment Deleted Successfully!", "SUCCESS");
        this.getAllComments(Number(noteId));
      },
      error: (err: any) => {
        this.toastr.error("Comment not Deleted!", "ERROR");
      }
    });
  }
}
