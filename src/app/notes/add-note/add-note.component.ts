import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit{

  ngOnInit(): void {
    this.noteservice.NoteData.reset();   
  }

  constructor(public noteservice: NotesService, public router: Router, public toastr: ToastrService){

  }

  onSubmit(){
    this.noteservice.addingNote().subscribe({
      next: (res: any) => {
        this.toastr.success(res.message, "SUCCESS");
        this.router.navigateByUrl('/home');
      },
      error: (err: any) => {
        this.toastr.error("Note Not Created", "ERROR");
        this.router.navigateByUrl('/notes/add-note');
      }
    }
    );
  }
  

}
