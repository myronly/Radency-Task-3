import { Category, INote } from "../interfaces/note.interface";
import { v4 } from "uuid";
import * as moment from "moment";
import { DatesFromContent } from "../helpers/dateFromContent";

export class Note implements INote {
  name: string;
  category: Category;
  content: string;
  date: string;
  created: string = moment().format("ll");
  id: string = v4();
  archived: boolean = false;
  
  constructor(name: string, category: Category, content: string) {
    this.name = name;
    this.category = category;
    this.content = content;
    this.date = DatesFromContent(content);
  }
}
