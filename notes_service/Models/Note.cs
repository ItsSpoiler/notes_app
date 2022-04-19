using System;
using System.ComponentModel.DataAnnotations;

namespace notes_service.Models
{
    public class Note
    {
        public int Id { get; set; } = 0;
        public DateTime Date { get; set; } = DateTime.Now;
        [MaxLength(50)]
        public string Subject { get; set; }
        [MaxLength(300)]
        public string Body { get; set; }
    }
}
