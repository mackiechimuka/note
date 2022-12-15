import { Component, OnInit } from '@angular/core';

import { Notes } from './notes.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  selectedNote:Notes

  constructor(private noteService:NotesService) { }

  ngOnInit(): void {
    this.noteService.notesSelectedEvent.subscribe((note:Notes)=>{
      this.selectedNote = note;
    })
  }

}
