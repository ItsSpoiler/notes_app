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
    public class NoteController : ControllerBase
    {
    
        private readonly INotesRepository _notesRepository;
        public NoteController(INotesRepository notesRepository)
        {
            _notesRepository = notesRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Note note = _notesRepository.GetNote(id);
            if(note == null) return NotFound();
            return Ok(note);
        }

        [HttpPost]
        public IActionResult Post(Note note) 
        {
            return Ok(_notesRepository.CreateNote(note));
        }
        
        [HttpPut]
        public IActionResult Put(Note note) 
        {   
            if(note.Id == 0) return NotFound();
            Note updatedNote = _notesRepository.UpdateNote(note);
            if (updatedNote == null) return NotFound();
            return Ok(note);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id) 
        {
            if(id == 0) return NotFound();
            _notesRepository.DeleteNote(id);
            return Ok();
        }

    }
}
