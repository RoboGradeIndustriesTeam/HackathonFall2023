import { Get, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Note } from "./schemas/note.schema";
import { Model } from "mongoose";
import * as slug from "slug";
import { User } from "src/users/schemas/user.schema";
import axios from "axios";
import { NoteView } from "./schemas/note-view.schema";
import { NotesService } from "./notes.service";
interface Node {
  tag?: string;
  attrs?: { [name: string]: string };
  children?: Node[];
}

@Injectable()
export class TelegraphImportService {
  private TELEGRAPH_API_ENDPORT: string = "https://api.telegra.ph";
  constructor(
    private noteService: NotesService,
    @InjectModel(Note.name) private noteModel: Model<Note>,
    @InjectModel(NoteView.name) private noteViewModel: Model<NoteView>,
  ) {}

  nodeToHtml(node: Node): string {
    if (typeof node === "string" || node instanceof String) {
      return node as string;
    }
    if (node.tag) {
      var html = `<${node.tag}`;
      if (node.attrs) {
        for (var name in node.attrs) {
          var value = node.attrs[name];
          html += ` ${name}="${value}"`;
        }
      }
      html += ">";
      if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          var child = node.children[i];
          html += this.nodeToHtml(child);
        }
      }
      html += `</${node.tag}>`;
      return html;
    } else {
      return "";
    }
  }
  async importFromTelegraph(telegraphUrl: string) {
    // TODO: add typings
    const { data } = await axios.get(
      this.TELEGRAPH_API_ENDPORT +
        `/getPage/${telegraphUrl}?return_content=true`,
    );
    console.log(data)
    if (data.ok) {
      const title = data.result.title;
      const subtitle = data.result.description;
      const authorName = data.result.author_name;
      const htmlBody = this.nodeToHtml(data.result.content[0]);
      
      return await this.noteService.createNote(title, htmlBody, subtitle, null, authorName, false, "default");
    }
    return null;
  }
}
