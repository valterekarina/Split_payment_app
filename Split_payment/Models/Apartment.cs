using System.Collections.Generic;

namespace Split_payment.Models
{
    public class Apartment
    {
        public int Id { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string HouseNo { get; set; }
        public string? ApartmentNo { get; set; }
        public double Area { get; set; }
        public int RentPrice { get; set; }
        public string? Relation { get; set; }

        public List<User> Users { get; set; }
        public List<Invoice> Invoices { get; set; }
        public List<Note> Notes { get; set; }
    }
}
