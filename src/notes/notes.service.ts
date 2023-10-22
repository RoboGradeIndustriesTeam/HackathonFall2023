import { Get, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Note } from "./schemas/note.schema";
import { Model } from "mongoose";
import * as slug from "slug";
import { User } from "src/users/schemas/user.schema";
import { NoteView } from "./schemas/note-view.schema";

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<Note>,
    @InjectModel(NoteView.name) private noteViewModel: Model<NoteView>,
  ) {}

  async     createNote(
    title: string,
    body: string,
    subtitle: string,
    author: User | null,
    authorName: string,
    burnable: number,
    theme: string
  ): Promise<Note> {
    const d = new Date();
    let slg = slug(title) + "-" + d.getMonth() + "-" + d.getDate();
    const candidate = await this.noteModel.findOne({
      slug: slg,
    }); 
    if (candidate) {
      slg = slg + "-" + Date.now();
    }
    const nt = await this.noteModel.create({
      body,
      title,
      slug: slg,
      subtitle,
      author: author,
      authorName: (author || { username: null }).username || authorName,
      burnable,
      theme
    });
    await nt.save();
    return nt;
  }

  async getNote(s: string): Promise<Note & { _id: string }> {
    return await this.noteModel.findOne({ slug: s });
  }

  async updateNote(s: string, newBody: string) {
    return await this.noteModel.updateOne({
      slug: s,
    }, {
      $set: {
        body: newBody,
      },
    });
  }

  async getUserNotes(user: User): Promise<Note[]> {
    return await this.noteModel.find({
      author: user,
      burnable: -1 
    });
  }

  async upViews(s: string, f: string) {
    const n = await this.getNote(s);
    const c = await this.noteViewModel.findOne({
      finger: f,
      note: n._id,
    });
    if (!c) {
      await this.noteViewModel.create({
        finger: f,
        note: n
      });
      if (n.burnable !== -1) {
        if (n.burnable - 1 === 0)
            return await this.noteModel.deleteOne({
                _id: n._id
            })
        else return await this.noteModel.updateOne({
            _id: n._id
        }, {
            $inc: {
                burnable: -1    
            }
        })
      }
      return await this.noteModel.updateOne({
        slug: s,
      }, {
        $inc: {
          views: true,
        },
      });
    }
  }

  async importFromTelegraph() {

  }
}
