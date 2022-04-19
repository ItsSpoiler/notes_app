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
    public class NoteTest
    {
        [Fact]
        public void GetNoteById_ShouldReturnOKObjectResult()
        {
            int id = 1;
            Note note =  new Note{
                Id = 2,
                Subject = "A Fake Note",
                Body = "A fake body of the fake note."
                };
            
            
            var mock = new Mock<INotesRepository>();
            mock.Setup(r => r.GetNote(id)).Returns(note);
            var noteController = new NoteController(mock.Object);
            
            
            
            var controller = new NotesController(mock.Object);
            var result = noteController.Get(id);
            Assert.IsType<OkObjectResult>(result);
        }
        [Fact]
        public void GetNoteById_ShouldReturnNotFoundResult()
        {
            int id = 1;
            Note note =  null;
            
            
            var mock = new Mock<INotesRepository>();
            mock.Setup(r => r.GetNote(id)).Returns(note);
            var noteController = new NoteController(mock.Object);
            
            
            
            var controller = new NoteController(mock.Object);
            var result = noteController.Get(id);
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void PostNote_ShouldReturnOkObjectResult()
        {
            Note note =  new Note{
                Subject = "A Fake Note",
                Body = "A fake body of the fake note."
                };
            
            
            var mock = new Mock<INotesRepository>();
            mock.Setup(r => r.CreateNote(note)).Returns(note);
            var noteController = new NoteController(mock.Object);
            
            
            
            var controller = new NoteController(mock.Object);
            var result = noteController.Post(note);
            Assert.IsType<OkObjectResult>(result);
        }
        [Fact]
        public void PutNote_ShouldReturnOkObjectResult()
        {
            Note note =  new Note{
                Id = 1,
                Subject = "A Fake Note",
                Body = "An updated fake body of the fake note."
                };
            
            var mock = new Mock<INotesRepository>();
            mock.Setup(r => r.UpdateNote(note)).Returns(note);
            var noteController = new NoteController(mock.Object);
            
            
            
            var controller = new NoteController(mock.Object);
            var result = noteController.Put(note);
            Assert.IsType<OkObjectResult>(result);
        }
        [Fact]
        public void PutNote_ShouldReturnNotFoundResult()
        {
            Note note =  new Note{
                Id = 1,
                Subject = "A Fake Note",
                Body = "An updated fake body of the fake note."
                };
            
            var mock = new Mock<INotesRepository>();
            mock.Setup(r => r.UpdateNote(note)).Returns(note);
            var noteController = new NoteController(mock.Object);
            
            
            note.Id = 0;
            var controller = new NoteController(mock.Object);
            var result = noteController.Put(note);
            Assert.IsType<NotFoundResult>(result);
        }
        
        [Fact]
        public void DeleteNoteById_ShouldReturnOkResult()
        {
            int id = 1;
            
            var mock = new Mock<INotesRepository>();
            mock.Setup(r => r.DeleteNote(id));
            var noteController = new NoteController(mock.Object);
            
            var controller = new NoteController(mock.Object);
            var result = noteController.Delete(id);
            Assert.IsType<OkResult>(result);
        }
        [Fact]
        public void DeleteNoteById_ShouldReturnNotFoundResult()
        {
            int id = 0;
            
            var mock = new Mock<INotesRepository>();
            mock.Setup(r => r.DeleteNote(id));
            var noteController = new NoteController(mock.Object);
            
            var controller = new NoteController(mock.Object);
            var result = noteController.Delete(id);
            Assert.IsType<NotFoundResult>(result);
        }
    }
}