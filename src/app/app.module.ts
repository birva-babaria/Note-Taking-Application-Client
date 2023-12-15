import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { NotesComponent } from './notes/notes.component';
import { NotesService } from './shared/notes.service';
import { EditNoteComponent } from './notes/edit-note/edit-note.component';
import { ExploreComponent } from './explore/explore.component';
import { CommentsService } from './shared/comments.service';
import { NoteDataComponent } from './note-data/note-data.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminNotedataComponent } from './admin-notedata/admin-notedata.component';
import { AdminService } from './shared/admin.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    NavMenuComponent,
    AddNoteComponent,
    NotesComponent,
    EditNoteComponent,
    ExploreComponent,
    NoteDataComponent,
    AdminPanelComponent,
    ForbiddenComponent,
    AdminNotedataComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [UserService, NotesService, CommentsService, AdminService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
