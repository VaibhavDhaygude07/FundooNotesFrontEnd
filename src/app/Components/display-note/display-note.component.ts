  import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
  import { MatDialog } from '@angular/material/dialog';
  import { UpdateNotesComponent } from '../update-note/update-note.component';
  import { DataService } from '../../Services/DataService/data.service';
  import { NotesService } from '../../Services/Notes/notes.service';
import { Subscription } from 'rxjs';

  interface Note {
    noteId: number;
    title: string;
    description: string;
    content: string;
    color: string;
    isDeleted: boolean;
    isArchive: boolean;
    isTrashed: boolean;
    id: number;
    isPinned?: boolean;
    isSelected?: boolean;
  }

  @Component({
    selector: 'app-display-note',
    standalone: false,
    templateUrl: './display-note.component.html',
    styleUrls: ['./display-note.component.scss'],
  })
  export class DisplayNoteComponent implements OnInit {
    @Input() notes: Note[] = [];
    @Input() loading: boolean = false;
    @Input() error: string = '';
    // @Input() viewMode: 'grid' | 'list' = 'grid'; 
    
    @Input() isArchiveView: boolean = false;
     @Input() isTrashView: boolean = false;
    @Output() retry = new EventEmitter<void>();
    @Output() refreshRequested = new EventEmitter<void>();

    searchNote: string = '';
    selectedNote: Note | null = null;
    viewMode: 'grid' | 'list' = 'grid';

    constructor(
      public dialog: MatDialog,
      private data: DataService,
      private notesService: NotesService
    ) {}

    ngOnInit(): void {
      console.log('NotesService?', this.notesService);
      this.data.incomingData.subscribe((searchTerm: any) => {
        this.searchNote = searchTerm || '';
     
      });
      
      console.log('Notes:', this.notes);
      
    }

    editNoteDialogBox(note: Note) {
      const dialogbox = this.dialog.open(UpdateNotesComponent, {
        width: '40%',
        data: note,
      });

      dialogbox.afterClosed().subscribe(() => {
        this.onRefreshRequested();
      });
    }

    archiveNote(note: Note) {
      this.notesService.archiveNotes(String(note.id)).subscribe({
        next: () => {
         
          note.isArchive = true;
          this.refreshRequested.emit();
        },
        error: (err) => {
          console.error('Failed to archive note', err);
        }
      });
    }
    
   deleteNote(note: Note) {
      this.notesService.trashNotes(String(note.id)).subscribe({
        next: () => {
          
          note.isTrashed = true;
         
          this.refreshRequested.emit(); 
        },
        error: (err) => {
          console.error('Failed to delete note', err);
        }
      });
    }

    
    onRetry() {
      this.retry.emit();
    }

    togglePin(note: Note) {
      note.isPinned = !note.isPinned;
    }

    toggleSelect(note: Note, event: Event) {
      event.stopPropagation();
      note.isSelected = !note.isSelected;
    }

    onRefreshRequested() {
      this.refreshRequested.emit();
    }
  }
