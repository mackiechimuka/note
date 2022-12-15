
import {EventEmitter, Injectable} from "@angular/core";
import {Subject} from 'rxjs'
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Notes } from "./notes/notes.model";


@Injectable({
  providedIn: 'root'
})
export class NotesService {
     maxNotesId:number
     notes:Notes[] =[] ;
     notesSelectedEvent = new EventEmitter<Notes>();
     notesChangedEvent = new EventEmitter<Notes[]>();
     notesListChangedEvent = new Subject<Notes[]>();

  constructor(private http:HttpClient) {
    this.maxNotesId = this.getMaxId()
   }

  getNotes():void{
    this.http.get<{message: string, notes: Notes[]}>('http://localhost:3000/notes').subscribe(
        (response)=>{
            this.notes = response.notes;
            this.maxNotesId = this.getMaxId();
            this.notes.sort((docA :Notes,docB:Notes):number=>{
                if(docA.id<docB.id){
                    return -1;
                } else if (docA === docB){
                    return 0;
                }else {
                    return 1;
                }
            });
            this.notesListChangedEvent.next(this.notes.slice());

        },(err: any) => {
            console.error(err);
          }
    );
}

getNote(id:string){
    for(let note of this.notes){
        if(note.id === id){
            return note;
        }
    }
    return null;
}

deleteNote(note: Notes) {
    if (!note) {
       return;
    }

    const pos = this.notes.indexOf(note);
    if (pos < 0) {
       return;
    }
    this.http.delete<{message: String}>(`http://localhost:3000/notes/${note.id}`)
    .subscribe((response: any) => {
      this.getNotes();
    })
 }

getMaxId():number{
    let maxId = 0;
    for(let note of this.notes){
        let currentId = parseInt(note.id);
        if (currentId> maxId){
            maxId = currentId;
        }
    }
    return maxId
}

addNote(newNote:Notes){
    if(!newNote){
        return;
    }
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

    newNote.id = '';

    this.http
    .post<{message: string, note: Notes}>('http://localhost:3000/notes', newNote, {headers: headers})
    .subscribe((response: any) => {
    this.notes.push(response.note);
    this.notes.sort((noteA :Notes,noteB:Notes):number=>{
        if(noteA.id<noteB.id){
            return -1;
        } else if (noteA === noteB){
            return 0;
        }else {
            return 1;
        }
    });
    this.notesListChangedEvent.next(this.notes.slice());
    this.getNotes();
});
}

updateNote(originalNote:Notes,newNote:Notes){
    if (!originalNote || !newNote){
        return
    }

    let pos = this.notes.indexOf(originalNote);
    if (pos<0){
        return
    }
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    
    const stringfiedNote = JSON.stringify(newNote);

    this.http
    .put<{message: string}>(`http://localhost:3000/notes/${originalNote.id}`, stringfiedNote, {headers: headers})
    .subscribe((response: any) => {
      this.getNotes();
    });

    
}

storeNotes(): void {
    let json = JSON.stringify(this.notes);
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this
    .http
    .put('http://localhost:3000/notes', json, {
      headers: header
    }).subscribe(() => {
      this.notesListChangedEvent.next((this.notes.slice()));
    });
  }


}

