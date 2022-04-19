using System.Collections.Generic;
using notes_service.Models;

namespace notes_service.Repository
{
    public interface INotesRepository
    {
        IEnumerable<Note> GetNotes();
        Note GetNote(int id);
        Note CreateNote(Note note);
        Note UpdateNote(Note note);
        void DeleteNotes(IEnumerable<int> ids);
        void DeleteNote(int id);
    }
}