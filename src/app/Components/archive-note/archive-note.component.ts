import { Component, Input, OnInit } from '@angular/core';
import { NotesService } from '../../Services/Notes/notes.service';
interface Note {
  noteId: any;
  title: string;
  description: string;
  color: string;
  isDeleted: boolean;
  isArchive: boolean;
}


@Component({
  selector: 'app-archive-note',
  standalone: false,
  templateUrl: './archive-note.component.html',
  styleUrl: './archive-note.component.scss'
})
export class ArchiveNoteComponent  implements OnInit {
  archivedNotes: any[] = []; // ✅ Fix: Define this as an array

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.getArchivedNotes();
  }

  getArchivedNotes() {
    this.notesService.getNotes().subscribe(
      (response: any) => {
        this.archivedNotes = response.filter((note: any) => note.isArchived);
      },
      (error) => {
        console.error('Error fetching archived notes:', error);
      }
    );
  }

  unarchiveNote(noteId: string) {
    this.notesService.archiveNotes(noteId).subscribe(
      () => {
        console.log('Note unarchived successfully');
        this.getArchivedNotes(); // Refresh the list
      },
      // (error) => {
      //   console.error('Error unarchiving note:', error);
      // }
    );
  }
}
