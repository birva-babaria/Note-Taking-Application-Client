import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../shared/comments.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NotesService } from '../shared/notes.service';
import { Notes } from '../interfaces/Notes';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit{

  notes: Notes[] = [];

  constructor(public noteservice: NotesService, public commentservice: CommentsService, public toastr: ToastrService, public router: Router){
  }

  ngOnInit(): void {
    this.getAllNotes();
  }

  getAllNotes(): void {
    this.noteservice.getAllNotes().subscribe({
      next: (res: any) => {
        this.notes = res;
      },
      error: (error: any) => {
        console.error('Error fetching notes:', error);
      }
    }); 
  }


}
