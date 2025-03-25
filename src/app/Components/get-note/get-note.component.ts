import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../Services/Notes/notes.service';
import { DisplayNoteComponent } from '../display-note/display-note.component';


interface Note {
  noteId: number;
  title: string;
  description: string;
  color: string;
  isDeleted: boolean;
  isArchive: boolean;
  id: number;
  isPinned?: boolean; 
  isSelected?: boolean;
}



@Component({
  selector: 'app-get-note',
  standalone:false,
  templateUrl: './get-note.component.html',
  styleUrls: ['./get-note.component.scss'],

})
export class GetNoteComponent implements OnInit {
  note: Note[] = [];
  loading = true;
  error = '';
reciv: any;
updateNote: any;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.fetchNotes();
  }

  fetchNotes() {
    this.notesService.getNotes().subscribe((response: any) => {
      console.log("API Response Type:", typeof response);
      console.log("Full API Response:", response);
  
      if (Array.isArray(response)) {
        console.log(" Response is an Array");
        this.note = response;  
      } 
      else if (response && response.data && Array.isArray(response.data.notes)) {
        console.log(" Response contains data.notes array");
        this.note = response.data.notes;  
      } 
      else {
        console.error(" Invalid response format:", response);
        this.note = [];
      }

      // this.note.forEach(note => {
      //   console.log(` Note - Title: ${note.title}, Description: ${note.description }`);
      // });

      
    });
  }
  
 
  


}