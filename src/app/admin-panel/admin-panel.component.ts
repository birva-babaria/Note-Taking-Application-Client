import { Component, OnInit } from '@angular/core';
import { Notes } from '../interfaces/Notes';
import { NotesService } from '../shared/notes.service';
import { AdminService } from '../shared/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit{
  notes: Notes[] = [];

  constructor(public noteservice: NotesService, public adminservice: AdminService, public toastr: ToastrService, public router: Router) {
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

  onDelete(id: number): void{
    this.adminservice.adminDeleteNote(id).subscribe({
      next: (res: any) => {
        this.toastr.success("Note Deleted Successfully!", "SUCCESS");
        this.getAllNotes();
        this.router.navigateByUrl("/admin-panel")
      },
      error: (err: any) => {
        this.toastr.error("Note not Deleted!", "ERROR");
      }
    });
  }


}
