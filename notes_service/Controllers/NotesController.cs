﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using notes_service.Models;
using notes_service.Repository;

namespace notes_service.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("AllowAny")]
    public class NotesController : ControllerBase
    {

        private readonly INotesRepository _notesRepository;
        public NotesController(INotesRepository notesRepository)
        {
            _notesRepository = notesRepository;
        }

        [HttpGet]
        [EnableCors("AllowAny")]
        public IActionResult Get()
        {
            IEnumerable<Note> notes = _notesRepository.GetNotes().OrderByDescending(n => n.Date);
            if(notes.Count() < 1) return NotFound();
            return Ok(notes);
        }

        [HttpDelete]
        [EnableCors("AllowAny")]
        public IActionResult Delete(int[] ids) 
        {
            _notesRepository.DeleteNotes(ids);
            return Ok();
        }

    }
}
