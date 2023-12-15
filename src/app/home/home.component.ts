import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotesService } from '../shared/notes.service';
import { Notes } from '../interfaces/Notes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  notes: Notes[] = [];
  trashes: Notes[] = [];

  constructor(public noteservice: NotesService, public toastr: ToastrService, public router: Router){

  }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteservice.getNotes().subscribe({
      next: (data: any) => {
        this.notes = data.notes;
        this.trashes = data.trash;
      },
      error: (error) => {
        console.error('Error fetching notes:', error);
      }
    }); 
  }

  onDelete(id: number): void {
    if (confirm('Are you sure to delete this note?'))
      this.noteservice.deleteNote(id).subscribe({
          next: (res: any) => {
              this.toastr.success("Note Deleted Successfully!", "SUCCESS");
              this.getNotes();
          },
          error: (err: any) => { 
            this.toastr.error("Error Deleting Note!", "ERROR");
            console.log(err);
          }
      });
  }

  onRecover(id: number): void {
    if (confirm('Are you sure to recover this note?'))
      this.noteservice.recoverNote(id).subscribe({
          next: (res: any) => {
              this.toastr.success("Note Recovered Successfully!", "SUCCESS");
              this.getNotes();
          },
          error: (err: any) => { 
            this.toastr.error("Error Recovering Note!", "ERROR");
            console.log(err);
           }
      });
  }

}
