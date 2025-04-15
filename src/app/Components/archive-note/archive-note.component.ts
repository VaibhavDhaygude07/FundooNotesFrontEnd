import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../Services/Notes/notes.service';

interface Note {
  noteId: number;
  title: string;
  description: string;
  color: string;
  isDeleted: boolean;
  isArchive: boolean;
  isTrashed: boolean;
  id: number;
  isPinned?: boolean;
  isSelected?: boolean;
}

@Component({
  selector: 'app-archive-note',
  standalone: false,
  templateUrl: './archive-note.component.html',
  styleUrls: ['./archive-note.component.scss']
})
export class ArchiveNoteComponent implements OnInit {
  archiveList: any[] = [];
  loading = true;
  error: string = '';


  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.getArchivedNotes();
    
  }

  getArchivedNotes() {
    this.notesService.getNotes().subscribe({
      next: (response: any) => {
        this.archiveList = response;
  
        console.log("Fetched archive list:", this.archiveList);
          this.archiveList = this.archiveList.filter(note => note.isArchive && !note.isDeleted);
          console.log("Filtered archive list:", this.archiveList);
        
  
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
    this.getArchivedNotes();
  }
  
}