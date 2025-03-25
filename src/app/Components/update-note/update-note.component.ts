import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IncomingMessage } from 'node:http';
import { NotesService } from '../../Services/Notes/notes.service';

interface Note {
  noteId: number;
  title: string;
  content: string;
  color: string;
  isDeleted: boolean;
  isArchive: boolean;
  id: number;
  isPinned?: boolean; 
  isSelected?: boolean; 
}


@Component({
  selector: 'app-update-notes',
  standalone:false,
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNotesComponent {

  Description: string;
  Title: string;
  noteId: number; 
  Color: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Note, 
    public dialogbox: MatDialogRef<UpdateNotesComponent>,
    private notesService: NotesService
  ) {
    this.Title = data.title;
    this.Description = data.content;
    this.noteId = data.noteId; 
    this.Color = data.color;
  }

  
  closeDialog() {

    console.log('Note ID before update:', this.noteId); // ✅ Debugging log

    if (!this.noteId) {
      console.error('❌ Error: noteId is missing');
      return; // Stop execution if noteId is missing
    }
    let reqData = {
      title: this.Title,
      content: this.Description,  // ✅ Corrected property name
      color: this.Color
    };
    

    this.notesService.updateNotes(this.noteId, reqData ).subscribe(
      
      (res: any) => {
        console.log(res);
        this.dialogbox.close();
      },
      (error) => {
        console.error('Error updating note:', error);
      }
    );
  }

  
}








