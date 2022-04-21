using System;
using System.ComponentModel.DataAnnotations;

namespace notes_service.Models
{
    public class Note
    {
        public int Id { get; set; } = 0;
        public DateTime Date { get; set; } = DateTime.Now;

        public string Subject { get; set; }

        public string Body { get; set; }
    }
}
