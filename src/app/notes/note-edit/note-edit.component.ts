import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import {ActivatedRoute,Router,Params} from '@angular/router'
import {NgForm} from '@angular/forms'


import { Notes } from '../notes/notes.model';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {
  originalNote:Notes;
  note:Notes;
  editMode:boolean

  constructor(private noteService:NotesService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      let id = params['id'];
      if (id === null || id===undefined){
        this.editMode = false;
        return;
      }
      this.originalNote = this.noteService.getNote((id));
      if(!this.originalNote ){
        return;
      }

      this.editMode = true;
     
      this.note = JSON.parse(JSON.stringify(this.originalNote));
  
    })
  }

  onSubmit(form:NgForm){
    const value = form.value;
    const newNote =new Notes(value.id,value.name,value.subject,value.noteText);
    if(this.editMode=== true){
      this.noteService.updateNote(this.originalNote,newNote);
    } else{
      this.noteService.addNote(newNote);
    }

    this.router.navigate(['./notes']);

  }

  onCancel(){
    this.router.navigate(['./notes']);
  }

}
