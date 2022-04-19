using System;
using System.Collections.Generic;
using Xunit;
using notes_service.Models;
using notes_service.Repository;
using notes_service.Controllers;
using Moq;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace notes_service.Test
{
    public class NotesTest
    {
        [Fact]
        public void GetAllNotes_ShouldReturnOKObjectResult()
        {
            IList<Note> notes = new List<Note>();
            
            for (int i = 1; i < 10; i++)
            {
                Note note = new Note{
                Id = i,
                Subject = "A Fake Note",
                Body = "A fake body of the fake note."
                };
                notes.Add(note);
            }
            
            var mock = new Mock<INotesRepository>();
            mock.Setup(r => r.GetNotes()).Returns(notes);
            var notesController = new NotesController(mock.Object);
            
            
            
            var controller = new NotesController(mock.Object);
            var result = notesController.Get();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void GetAllNotes_ShouldReturnNotFoundResult()
        {
            IList<Note> notes = new List<Note>();
            
            
            var mock = new Mock<INotesRepository>();
            mock.Setup(r => r.GetNotes()).Returns(notes);
            var notesController = new NotesController(mock.Object);
            
            
            
            var controller = new NotesController(mock.Object);
            var result = notesController.Get();
            Assert.IsType<NotFoundResult>(result);
        }
        
    }
}