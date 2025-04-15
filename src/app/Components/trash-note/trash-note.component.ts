import { Component, Input, OnInit } from '@angular/core';
import { NotesService } from '../../Services/Notes/notes.service';

interface Note {
  noteId: number;
  title: string;
  description: string;
  content: string; 
  color: string;
  isDeleted: boolean;
  isTrashed: boolean; 
  isArchive: boolean;
  id: number;
  isPinned?: boolean;
  isSelected?: boolean;
}


@Component({
  selector: 'app-trash-note',
  standalone: false,
  templateUrl: './trash-note.component.html',
  styleUrl: './trash-note.component.scss'
})
export class TrashNoteComponent   implements OnInit{
  trashList:  any[] = [];
  loading = true;
  error: string = '';

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.getTrashedNotes();
  }

  getTrashedNotes() {
    this.notesService.getNotes().subscribe({
      next: (response: any) => {
        this.trashList = response;
  
        console.log("Fetched trash list:", this.trashList);
          this.trashList = this.trashList.filter(note =>  note.isTrashed && !note.isDeleted );
          console.log("Filtered trash list:", this.trashList);
        
  
        this.loading = false; 
      },
      error: (error) => {
        console.error("Error fetching notes:", error);
        this.error = "Failed to load notes.";
        this.loading = false; 
      }
    });
  }
  handleRefresh() {
    this.getTrashedNotes();
  }
}