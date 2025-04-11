import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: false
})
export class SearchPipe implements PipeTransform {

  transform(notes: any[], searchText: string) {
  
    if(searchText==''){
      return notes;
    }
    const displayNote =[];
    for (const note of notes) {
      if(note.title.includes(searchText))
      {
        displayNote.push(note);
      }
    }
    return displayNote;
}

    // if (typeof searchText !== 'string' || !searchText.trim()) {
    //   return notes;
    // }

    // const term = searchText.toLowerCase().trim();

    // return notes.filter(note => {
      
    //   const titleMatch = note.title && typeof note.title === 'string' 
    //     ? note.title.toLowerCase().includes(term) 
    //     : false;
      
    //   const descMatch = note.description && typeof note.description === 'string'
    //     ? note.description.toLowerCase().includes(term)
    //     : false;

    //   return titleMatch || descMatch;
    // });
  }

