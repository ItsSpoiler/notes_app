using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using notes_service.Models;
using notes_service.Repository;

namespace notes_service.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : ControllerBase
    {

        private readonly INotesRepository _notesRepository;
        public NotesController(INotesRepository notesRepository)
        {
            _notesRepository = notesRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Note> notes = _notesRepository.GetNotes();
            if(notes.Count() < 1) return NotFound();
            return Ok(notes);
        }

        [HttpDelete]
        public IActionResult Delete(int[] ids) 
        {
            _notesRepository.DeleteNotes(ids);
            return Ok();
        }

    }
}
