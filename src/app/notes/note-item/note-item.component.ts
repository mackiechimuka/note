import { Component, Input, OnInit } from '@angular/core';
import { Notes } from '../notes/notes.model';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {
  @Input() note:Notes

  constructor() { }

  ngOnInit(): void {
  }

}
