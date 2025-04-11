import { Component, Input, OnInit } from '@angular/core';
import { NotesService } from '../../Services/Notes/notes.service';

interface Note {
  noteId: number;
  title: string;
  description: string;
  content: string; // <- required!
  color: string;
  isDeleted: boolean;
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
  trashList: Note[] = [];
  loading = true;
  error: string = '';

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.getTrashedNotes();
  }

  getTrashedNotes() {
    this.notesService.getNotes().subscribe({
      next: (response: Note[]) => {
        console.log("All Notes:", response);
        this.trashList = response.filter(note => note.isDeleted === true);
        console.log("Trashed Notes:", this.trashList);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching notes:', err);
        this.error = 'Failed to load trashed notes.';
        this.loading = false;
      }
    });
  }
}

