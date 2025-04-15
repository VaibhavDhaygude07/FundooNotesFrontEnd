import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotesService } from '../../Services/Notes/notes.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-icon-button',
  standalone:false,
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit{
  @Input() notesObject: any;
  @Output() refreshRequested = new EventEmitter<void>();


  Color:any;
  selectedColor: string = ''; 

  colorArray: Array<any> = [
    { code: '#ffffff', name: 'white' },
    { code: '#FF6347', name: 'Tomato' },
    { code: '#FF4500', name: 'OrangeRed'},
    { code: '#FFFF00', name: 'yellow' },
    { code: '#ADFF2F', name: 'greenyellow' },
    { code: '#B0C4DE', name: 'LightSteelBlue' },
    { code: '#EEE8AA', name: 'PaleGoldenRod' },
    { code: '#7FFFD4', name: 'Aquamarine' },
    { code: '#FFE4C4', name: 'Bisque' },
    { code: '#C0C0C0', name: 'Silver' },
    { code: '#BC8F8F', name: 'RosyBrown' },
    { code: '#D3D3D3', name: 'grey' },
  ];

  constructor(private notesService: NotesService, private router: Router) {}
  ngOnInit(): void {
    
  }

  updateNotes(noteId: number, reqData: any) {
    this.notesService.updateNotes(noteId, reqData).subscribe({
      next: (res: any) => {
        console.log("Note updated successfully:", res);
      },
      error: (err) => {
        console.error("Error updating note:", err);
      }
    });
  }

  onDelete() {
    if (!this.notesObject || !this.notesObject.noteId) {
      console.error("❌ Error: Note object is undefined or missing 'noteId'");
      return;
    }
  
    const noteId = this.notesObject.noteId;
    console.log("🟢 Deleting Note ID:", noteId);
  
    this.notesService.trashNotes(noteId).subscribe({
      next: (res: any) => {
        console.log("Note trashed successfully:", res);
        this.refreshRequested.emit(); // Emit the event to refresh the notes list
      },
      error: (err) => {
        console.error("Error deleting note:", err);
      }
    });
  }
  
      onArchive() {
        const noteId = this.notesObject?.noteId;

        if (!noteId) {
          console.error("❌ Invalid noteId");
          return;
        }

        this.notesService.archiveNotes(noteId).subscribe({
          next: (response: any) => {
            console.log("✅ Note archived successfully", response);
            this.refreshRequested.emit();

            
          },
          error: (err) => {
            console.error("❌ Failed to archive note", err);
          }
        });
      }

  onUnArchive() {
    const noteId = this.notesObject?.noteId;

    if (!noteId) {
      console.error("❌ Invalid noteId");
      return;
    }

    this.notesService.archiveNotes(noteId).subscribe({
      next: (response: any) => {
        console.log("✅ Note unarchived successfully", response);
        this.refreshRequested.emit();
      },
      error: (err) => {
        console.error("❌ Failed to unarchive note", err);
      }
    });
  }

      // trashNote() {
      //   const noteId  = this.notesObject?.noteId;
      //   if (!noteId) {
      //     console.error("❌ Invalid noteId");
      //     return;
      //   }
      //   this.notesService.trashNotes(noteId).subscribe({
      //     next: (response: any) => {
      //       console.log("✅ Note trashed successfully", response);
      //       this.refreshRequested.emit();
      //     },
      //     error: (err) => {
      //       console.error("❌ Failed to trash note", err);
      //     }
      //   });
      // }

      // untrashNote() {
      //   const noteId  = this.notesObject?.noteId;
      //   if (!noteId) {
      //     console.error("❌ Invalid noteId");
      //     return;
      //   }
      //   this.notesService.trashNotes(noteId).subscribe({
      //     next: (response: any) => {
      //       console.log("✅ Note untrashed successfully", response);
      //       this.refreshRequested.emit();
      //     },
      //     error: (err) => {
      //       console.error("❌ Failed to untrash note", err);
      //     }
      //   });
      // }


  SelectColor(colors: any) {
    if (!this.notesObject || !this.notesObject.noteId) {
      console.error("Note object is undefined or missing 'noteId'", this.notesObject);
      return;
    }

    let reqData = {
      title: this.notesObject.title,  // Keep existing title
      content: this.notesObject.content,  // Keep existing content
      color: colors.code // Update only color
    };
  
    this.selectedColor = colors.code; 
    this.notesObject.color = colors.code; 
  
    console.log("Updating Note ID:", this.notesObject.noteId, "with color:", colors.code);
  
    this.notesService.updateNotes(this.notesObject.noteId, reqData).subscribe({
      next: (res: any) => console.log("Note color updated successfully:", res),
      error: (err) => console.error("Error updating note color:", err)
    });
  }
  
}




