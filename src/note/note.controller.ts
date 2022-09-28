import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateNoteDto } from "./dto/createNote.dto";
import { INoteEdit } from "./interfaces/note.interface";
import { NoteService } from "./note.service";

@Controller("notes")
export class NoteController {
  constructor(private noteService: NoteService) {}
  @Get()
  getAllNotes() {
    return this.noteService.getAllNotes();
  }

  @Get("active")
  getActiveNotes() {
    return this.noteService.getActiveNotes();
  }

  @Get("archive")
  getArchiveNotes() {
    return this.noteService.getArchiveNotes();
  }

  @Get("stats")
  getStatsNotes() {
    return this.noteService.getStatsNotes();
  }

  @Get(":id")
  getNoteById(@Param("id") id: string) {
    return this.noteService.getNoteById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post("create")
  createNote(@Body() note: CreateNoteDto) {
    return this.noteService.createNote(note);
  }
  
  @UsePipes(new ValidationPipe())
  @Patch(":id")
  editNote(@Param("id") id: string, @Body() body: CreateNoteDto) {
    return this.noteService.editNoteById(id, body);
  }

  @Patch(":id/archive")
  archiveNote(@Param("id") id: string) {
    return this.noteService.archiveNote(id);
  }

  @Delete(":id")
  deleteNote(@Param("id") id: string) {
    return this.noteService.deleteNoteById(id);
  }
}
