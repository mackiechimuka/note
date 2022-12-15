import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { NoteItemComponent } from './notes/note-item/note-item.component';
import { NoteDetailComponent } from './notes/note-detail/note-detail.component';
import { HeaderComponent } from './notes/header/header.component';
import { NotesModule } from './notes.module';
import { NotesComponent } from './notes/notes/notes.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    NoteEditComponent,
    NoteItemComponent,
    NoteDetailComponent,
    HeaderComponent,
    NotesComponent
  ],
  imports: [
    BrowserModule,
    NotesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NotesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
