import { Injectable } from "@nestjs/common";
import { DatesFromContent } from "./helpers/dateFromContent";
import { Note } from "./entities/note.entity";
import { Category, INote, INoteEdit } from "./interfaces/note.interface";
import { IStats } from "./interfaces/stats.interface";
import { CreateNoteDto } from "./dto/createNote.dto";

import { IsEnum } from "class-validator";
import { EditNoteDto } from "./dto/editNote.dto";


@Injectable()
export class NoteService {
  private notes: INote[] = [
    {
      created: "Sep 28, 2022",
      id: "b3ff48e9-7ec7-4f56-af69-aeb2009de6a3",
      archived: false,
      name: "Shopping list",
      category: Category.TASK,
      content: "The some content",
      date: "",
    },
    {
      created: "Sep 28, 2022",
      id: "628efadb-8eb2-42dd-ac0a-eb187b6a9cd0",
      archived: true,
      name: "The theory of evolution",
      category: Category.IDEA,
      content: "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
      date: "3/5/2021, 5/5/2021",
    },
    {
      created: "Sep 28, 2022",
      id: "bed8832e-d7e4-4051-9538-852aaeb83ca4",
      archived: false,
      name: "The theory of evolution",
      category: Category.IDEA,
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      date: "",
    },
    {
      created: "Sep 28, 2022",
      id: "91cb1fd6-d762-45f7-a650-5c1695df8382",
      archived: true,
      name: "William Gaddis",
      category: Category.QUOTE,
      content: "The some content",
      date: "",
    },
    {
      created: "Sep 28, 2022",
      id: "f8c5ceca-5ba6-4705-8e45-1fe7451aa001",
      archived: false,
      name: "Books",
      category: Category.RANDOM_THOUGHT,
      content: "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
      date: "3/5/2021, 5/5/2021",
    },
    {
      created: "Sep 28, 2022",
      id: "2f4d494b-32ae-4b7e-962e-b56b8b205438",
      archived: false,
      name: "William Gaddis",
      category: Category.QUOTE,
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      date: "",
    },
    {
      created: "Sep 28, 2022",
      id: "9b323f1e-9a4d-44af-b40d-6037a0620f0c",
      archived: true,
      name: "New Feature",
      category: Category.RANDOM_THOUGHT,
      content: "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
      date: "3/5/2021, 5/5/2021",
    },
    {
      created: "Sep 28, 2022",
      id: "3a1997e1-187d-4899-b07a-1b5c2c971f1e",
      archived: false,
      name: "Shopping list",
      category: Category.TASK,
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      date: "",
    },
  ];

  getAllNotes() {
    return this.notes;
  }

  getActiveNotes() {
    return this.notes.filter((note) => note.archived === false);
  }

  getArchiveNotes() {
    return this.notes.filter((note) => note.archived === true);
  }

  getStatsNotes() {
    const noteTask = this.notes.filter((note) => note.category === "Task");
    const noteIdea = this.notes.filter((note) => note.category === "Idea");
    const noteQuote = this.notes.filter((note) => note.category === "Quote");
    const noteRandomThought = this.notes.filter((note) => note.category === "Random Thought");

    const stats: IStats = {
      active: {
        Task: noteTask.filter((item) => item.archived === false).length,
        Idea: noteIdea.filter((item) => item.archived === false).length,
        Quote: noteQuote.filter((item) => item.archived === false).length,
        "Random Thought": noteRandomThought.filter((item) => item.archived === false).length,
      },
      archive: {
        Task: noteTask.filter((item) => item.archived === true).length,
        Idea: noteIdea.filter((item) => item.archived === true).length,
        Quote: noteQuote.filter((item) => item.archived === true).length,
        "Random Thought": noteRandomThought.filter((item) => item.archived === true).length,
      },
    };

    return stats;
  }

  getNoteById(id: string) {
    return this.notes.find((note) => note.id === id);
  }

  createNote({ name, content, category }: CreateNoteDto) {
    const newNote = new Note(name, category, content);
    this.notes.push(newNote);
    return newNote;
  }

  editNoteById(id: string, { name, category, content }: EditNoteDto) {
    const editNote = this.notes.find((note) => note.id === id);
    editNote!.name = name || editNote!.name;
    editNote!.category = category || editNote!.category;
    editNote!.content = content || editNote!.content;
    editNote!.date = DatesFromContent(editNote.content);
    return editNote;
  }

  archiveNote(id: string) {
    const toggleArchive = this.notes.find((note) => note.id === id);
    toggleArchive!.archived = !toggleArchive!.archived;
    return toggleArchive;
  }

  deleteNoteById(id: string) {
    this.notes = this.notes.filter((note) => note.id !== id);
    return this.notes;
  }
}
