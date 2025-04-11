import { Component, OnInit } from "@angular/core";
import { trigger, state, style, transition, animate } from "@angular/animations";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NotesService } from "../../Services/Notes/notes.service";

@Component({
  selector: "app-description",
  standalone: false,
  templateUrl: "./description.component.html",
  styleUrls: ["./description.component.scss"],
  animations: [
    trigger("expandCollapse", [
      state(
        "collapsed",
        style({
          height: "46px",
          boxShadow: "none",
        })
      ),
      state(
        "expanded",
        style({
          minHeight: "180px",
          boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
        })
      ),
      transition("collapsed <=> expanded", [animate("200ms ease-in-out")]),
    ]),
  ],
})
export class DescriptionComponent implements OnInit {
  noteForm!: FormGroup;
  isExpanded = false;
  noteTitle = "";
  noteContent = "";

  constructor(private formBuild: FormBuilder, private noteService: NotesService) {}

  ngOnInit(): void {
    this.noteForm = this.formBuild.group({
      title: [""],     
      content: [""],    
      color: ["#FFFFFF"], 
    });
  }
  // Function to handle color change
updateColor(newColor: string) {
  this.noteForm.patchValue({ color: newColor });
  console.log("🎨 Color updated:", newColor);
}
  expandNote() {
    this.isExpanded = true;
  }

  closeNote(event: Event) {
    event.preventDefault();
  
    let reqData = {
      title: this.noteForm.get("title")?.value?.trim(),
      content: this.noteForm.get("content")?.value?.trim(),
      color: this.noteForm.get("color")?.value || "#FFFFFF",
    };
  
    console.log("📌 Request Data:", reqData);
  
    // If both fields are empty, just close without submitting
    if (!reqData.title && !reqData.content) {
      console.warn("📝 Empty note. Closing without saving.");
      this.isExpanded = false;
      this.noteForm.reset({ color: "#FFFFFF" });
      return;
    }
  
    // Otherwise, proceed to save
    this.noteService.addNotes(reqData).subscribe(
      (res: any) => {
        console.log("✅ Note added successfully:", res);
        this.isExpanded = false;
        this.noteForm.reset({ color: "#FFFFFF" });
      },
      (error) => {
        console.error("❌ Error while adding note:", error);
        console.error("🔍 Full Error Details:", error.error);
      }
    );
  }
}
