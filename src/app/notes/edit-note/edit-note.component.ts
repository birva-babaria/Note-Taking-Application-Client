import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Notes } from 'src/app/interfaces/Notes';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit{
  editedNote: Notes = {
    id: 0,
    title: '',
    data: '',
    createddate: new Date(),
    lastmodifieddate: new Date(),
    trashstatus: false,
    userName: '',
    deleteddate: new Date(),
  };

  constructor(public noteservice: NotesService, public router: Router, public route: ActivatedRoute, public toastr: ToastrService){

  }

  ngOnInit(): void {
    const noteId = this.route.snapshot.paramMap.get('id');
    this.noteservice.getNoteById(Number(noteId)).subscribe({
      next: (note: any) => {
        this.editedNote = note;
      },
      error: (error: any) => {
        console.error('Error fetching note:', error);
      }
    });
  }

  saveChanges(): void {
    const noteId = this.route.snapshot.paramMap.get('id');
    console.log(noteId);
    this.noteservice.editNote(Number(noteId), this.editedNote).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message, "SUCCESS");
        console.log('Note edited successfully');
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        this.toastr.error("Error Updating Note", "ERROR");
        console.error('Error editing note:', this.editedNote, error);
      }
    });
  }
}
