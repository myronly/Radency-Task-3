export interface INote {
  name: string;
  category: Category;
  content: string;
  date?: string;
  created?: string;
  id?: string;
  archived?: boolean;
}

export interface INoteEdit {
  name?: string;
  category?: Category;
  content?: string;
}

export enum Category {
  TASK = "Task",
  IDEA = "Idea",
  QUOTE = "Quote", 
  RANDOM_THOUGHT = "Random Thought",
}
