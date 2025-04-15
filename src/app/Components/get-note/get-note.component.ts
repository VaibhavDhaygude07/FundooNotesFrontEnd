  import { Component, OnInit } from '@angular/core';
  import { NotesService } from '../../Services/Notes/notes.service';
  import { DisplayNoteComponent } from '../display-note/display-note.component';


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
    selector: 'app-get-note',
    standalone:false,
    templateUrl: './get-note.component.html',
    styleUrls: ['./get-note.component.scss'],

  })
  export class GetNoteComponent implements OnInit {
    noteList: any[] = [];
    loading = true;
    error: string | null = null;
    viewMode: 'grid' | 'list' = 'grid'; 
  
    data = {
      currentViewMode: {
        subscribe: (callback: (mode: 'grid' | 'list') => void) => {
          // Mock implementation for subscription
          callback('grid'); // Default mode
        }
      }
    };

    constructor(private notesService: NotesService) {}
  
    ngOnInit(): void {
      this.loadNotes();
      this.data.currentViewMode.subscribe((mode: 'grid' | 'list') => {
        this.viewMode = mode;
      });
  
    }
  
    loadNotes() {
      this.loading = true;
      this.error = null;
  
      this.notesService.getNotes().subscribe({
        next: (response: any) => {
          const notesArray = this.extractNotes(response);
          this.noteList = notesArray.filter(note => !note.isArchive && !note.isDeleted && !note.isTrashed);
         
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading notes:', err);
          this.error = 'Failed to load notes.';
          this.loading = false;
        }
      });
    }
    handleRefresh() {
      this.loadNotes();
    }

    getNotes() {
      this.notesService.getNotes().subscribe({
        next: (response: any) => {
          this.noteList = response.filter((note: any) =>
            note.isArchive === false && note.isTrashed === false
          );
        },
        error: (err) => {
          console.error('Error fetching notes:', err);
        }
      });
    }
    
    toggleViewMode() {
      this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
    }
    
  
    extractNotes(response: any): any[] {
      if (Array.isArray(response)) return response;
      if (response?.data) return Array.isArray(response.data) ? response.data : [];
      return [];
    }

  }