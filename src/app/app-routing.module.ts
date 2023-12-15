import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth/auth.guard';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NotesComponent } from './notes/notes.component';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { EditNoteComponent } from './notes/edit-note/edit-note.component';
import { ExploreComponent } from './explore/explore.component';
import { NoteDataComponent } from './note-data/note-data.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminNotedataComponent } from './admin-notedata/admin-notedata.component';

const routes: Routes = [
  {path:'',redirectTo:'/user/login', pathMatch:'full'},

  {
    path:'user', component:UserComponent,
    children:[
      {path:'registration', component:RegistrationComponent},
      {path:'login', component:LoginComponent},
    ]
  },

  {path:'nav-menu', component:NavMenuComponent},

  {path:'home', component:HomeComponent, canActivate:[authGuard]},

  {
    path:'notes', component:NotesComponent, canActivate:[authGuard],
    children:[
      {path:'add-note', component:AddNoteComponent, canActivate:[authGuard]},
      {path:'edit-note/:id', component:EditNoteComponent, canActivate:[authGuard]},
    ]
  },

  {path:'explore', component:ExploreComponent, canActivate:[authGuard]},
  
  {path:'note-data/:id', component:NoteDataComponent, canActivate:[authGuard]},

  {path:'admin-panel', component:AdminPanelComponent, canActivate:[authGuard], data: {permittedRoles: ["Admin"]}},

  {path:'admin-notedata/:id', component:AdminNotedataComponent, canActivate:[authGuard], data: {permittedRoles: ["Admin"]}},

  {path: 'forbidden', component:ForbiddenComponent, canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }