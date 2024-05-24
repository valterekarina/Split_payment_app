using System;

namespace Split_payment.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime NoteDate { get; set; }
        public int ApartmentId { get; set; }
        public Apartment Apartment { get; set; }
    }
}
