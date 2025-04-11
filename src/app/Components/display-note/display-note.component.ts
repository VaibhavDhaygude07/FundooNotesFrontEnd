  import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
  import { MatDialog } from '@angular/material/dialog';
  import { UpdateNotesComponent } from '../update-note/update-note.component';
  import { DataService } from '../../Services/DataService/data.service';
  import { NotesService } from '../../Services/Notes/notes.service';
import { debuglog } from 'node:util';

  interface Note {
    noteId: number;
    title: string;
    description: string;
    content: string;
    color: string;
    isDeleted: boolean;
    isArchive: boolean;
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
    @Input() isArchiveView: boolean = false;
    @Output() retry = new EventEmitter<void>();
    //  @Output() UpdateAutoRefresh = new EventEmitter();
    @Output() refreshRequested = new EventEmitter<void>();

    searchNote: string = '';
    selectedNote: Note | null = null;

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

    archiveNote(note: Note, event: Event) {
      event.stopPropagation();
      
      this.notesService.archiveNotes(note.noteId.toString()).subscribe({
        next: (res: any) => {
          
          note.isArchive = !note.isArchive;
    
          console.log(` Note archive status changed: ${res.data}`);
          this.onRefreshRequested();
        },
        error: (err) => {
          console.error(' Failed to toggle archive status', err);
        }
      });

    }
    
    deleteNote(note: Note | null, event: Event) {
      event.stopPropagation();
      if (!note) return;
      note.isDeleted = true;
      console.log('Note trashed:', note);
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
