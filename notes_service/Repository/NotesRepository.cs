using System.Collections.Generic;
using LiteDB;
using notes_service.Models;

namespace notes_service.Repository
{
    public class NotesRepository : INotesRepository
    {
        public Note CreateNote(Note note)
        {
            using(var db = new LiteDatabase(@"filename=Data\NotesData.db;connection=shared"))
            {
                var col = db.GetCollection<Note>("notes");

                // Create your new customer instance
                var newNote = new Note
                { 
                    Subject = note.Subject,
                    Body = note.Body
                };

                col.Insert(newNote);
                return newNote;
            }
            
        }

        public void DeleteNote(int id)
        {
            using(var db = new LiteDatabase(@"filename=Data\NotesData.db;connection=shared"))
            {
                var col = db.GetCollection<Note>("notes");
                col.Delete(id);
            }
        }

        public void DeleteNotes(IEnumerable<int> ids)
        {
            using(var db = new LiteDatabase(@"filename=Data\NotesData.db;connection=shared"))
            {
                var col = db.GetCollection<Note>("notes");
                foreach (var id in ids)
                {
                    col.Delete(id);
                }
            }
        }

        public Note GetNote(int id)
        {
            using(var db = new LiteDatabase(@"filename=Data\NotesData.db;connection=shared"))
            {
                var col = db.GetCollection<Note>("notes");
                return col.FindById(id);
            }
        }

        public IEnumerable<Note> GetNotes()
        {
            using(var db = new LiteDatabase(@"filename=Data\NotesData.db;connection=shared"))
            {
                var col  = db.GetCollection<Note>("notes");
                return col.FindAll();
            }
        }

        public Note UpdateNote(Note note)
        {
            using(var db = new LiteDatabase(@"filename=Data\NotesData.db;connection=shared"))
            {
                var col = db.GetCollection<Note>("notes");
                Note oldNote = col.Query()
                    .Where(x => x.Id.Equals(note.Id)).FirstOrDefault();
              if(note == null) return null;
                oldNote.Subject = note.Subject;
                oldNote.Body = note.Body;
                oldNote.Date = System.DateTime.Now;
                col.Update(oldNote);
                return oldNote;
            }
        }
    }
}