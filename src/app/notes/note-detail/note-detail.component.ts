import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute,Params} from '@angular/router';
import { NotesService } from '../notes.service';
import { Notes } from '../notes/notes.model';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  note:Notes;
  id:string;
  

  constructor(private notesService:NotesService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .subscribe((params:Params)=>{
      this.id = params['id'];
      this.note =this.notesService.getNote(this.id)
    })
  }

  onDelete(){
    this.notesService.deleteNote(this.note);
    this.router.navigate(['../notes'])
  }

}
