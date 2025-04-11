import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ToDoListComponent } from './Components/to-do-list/to-do-list.component';
import { DescriptionComponent } from './Components/description/description.component';
import { DisplayNoteComponent } from './Components/display-note/display-note.component';
import { IconButtonComponent } from './Components/icon-button/icon-button.component';
import { AddNoteComponent } from './Components/add-note/add-note.component';
import { GetNoteComponent } from './Components/get-note/get-note.component';
import { UpdateNotesComponent } from './Components/update-note/update-note.component';
import { ArchiveNoteComponent } from './Components/archive-note/archive-note.component';
import { TrashNoteComponent } from './Components/trash-note/trash-note.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'resetpassword/:token', component: ResetPasswordComponent },
  { path: 'todolist', component: ToDoListComponent },
  { path: 'description', component: DescriptionComponent },
  { path: 'iconbutton', component: IconButtonComponent },
  { path: 'update', component: UpdateNotesComponent },
  
 
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'notes', pathMatch: 'full' },
      { path: 'notes', component: GetNoteComponent },
       {path: 'archive', component:ArchiveNoteComponent},
      
      { path: 'trash', component: TrashNoteComponent },
      { path: 'displayNote', component: DisplayNoteComponent }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
