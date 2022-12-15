import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { NotesService } from '../notes.service';
import { Notes } from '../notes/notes.model';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit,OnDestroy {
  notes:Notes[];
  subscription:Subscription;
  isloading:boolean = false;
  constructor(private notesService:NotesService) { }

  ngOnInit() {
    this.isloading =true;
    this.notesService.getNotes();
    this.subscription = this.notesService.notesListChangedEvent.subscribe((noteList:Notes[]) =>{
      this.notes = noteList;
    })
    this.isloading = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
