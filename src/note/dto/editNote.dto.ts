import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Category } from "../interfaces/note.interface";

export class EditNoteDto {
  @IsOptional()
  @IsNotEmpty({ message: "Name is empty." })
  name: string;

  @IsOptional()
  @IsNotEmpty({ message: "Content is empty." })
  content: string;
  
  @IsOptional()
  @IsEnum(Category, { message: `Category is not choose or is not correct.` })
  category: Category;
}
