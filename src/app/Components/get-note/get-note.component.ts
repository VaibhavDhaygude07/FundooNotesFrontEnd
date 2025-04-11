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
  
    constructor(private notesService: NotesService) {}
  
    ngOnInit(): void {
      this.loadNotes();
      // this.getNotes();
    }
  
    loadNotes() {
      this.loading = true;
      this.error = null;
  
      this.notesService.getNotes().subscribe({
        next: (response: any) => {
          const notesArray = this.extractNotes(response);
          this.noteList = notesArray.filter(note => !note.archive && !note.trash);
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading notes:', err);
          this.error = 'Failed to load notes.';
          this.loading = false;
        }
      });
    }


    // getNotes() {
    //   this.loading = true;
    //   this.notesService.getNotes().subscribe({
    //     next: (res: any) => {
    //       this.noteList = res.data || []; // depends on your API structure
    //       this.loading = false;
    //     },
    //     error: (err) => {
    //       this.error = 'Failed to fetch notes';
    //       this.loading = false;
    //     }
    //   });
    // }
  
    extractNotes(response: any): any[] {
      if (Array.isArray(response)) return response;
      if (response?.data) return Array.isArray(response.data) ? response.data : [];
      return [];
    }

  }