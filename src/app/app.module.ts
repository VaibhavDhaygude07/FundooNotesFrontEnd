// import { NgModule } from '@angular/core';
import { NgModule } from '@angular/core';

import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// import { trigger, state, style, transition, animate } from "@angular/animations";
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { MatTooltipModule } from "@angular/material/tooltip";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MatMenuTrigger } from "@angular/material/menu";
import { ToDoListComponent } from './Components/to-do-list/to-do-list.component';
import { DescriptionComponent } from './Components/description/description.component';
import { IconButtonComponent } from './Components/icon-button/icon-button.component';
import { AddNoteComponent } from './Components/add-note/add-note.component';
import { GetNoteComponent } from './Components/get-note/get-note.component';
import { MatMenuModule } from '@angular/material/menu';
import { UpdateNotesComponent } from './Components/update-note/update-note.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TextFieldModule } from '@angular/cdk/text-field';
// import { DisplayNotesComponent } from './Components/display-note/display-notes.component'; // Fixed path
import { DisplayNoteComponent } from './Components/display-note/display-note.component';
import { ArchiveNoteComponent } from './Components/archive-note/archive-note.component';
import { TrashNoteComponent } from './Components/trash-note/trash-note.component';
import { SearchPipe } from './Pipes/search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    ToDoListComponent,
    DescriptionComponent,
    AddNoteComponent,
    DisplayNoteComponent,
    IconButtonComponent,
    GetNoteComponent,
    UpdateNotesComponent,
    ArchiveNoteComponent,
     TrashNoteComponent,
     SearchPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    TextFieldModule,
    MatMenuTrigger,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }