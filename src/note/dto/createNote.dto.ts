import { IsEnum, IsNotEmpty } from "class-validator";
import { Category } from "../interfaces/note.interface";

export class CreateNoteDto {
  @IsNotEmpty({ message: "Name is empty." })
  name: string;

  @IsNotEmpty({ message: "Content is empty." })
  content: string;

  @IsEnum(Category, { message: `Category is not choose or is not correct.` })
  category: Category;
}
