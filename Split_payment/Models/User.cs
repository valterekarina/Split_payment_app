using System.Collections.Generic;

namespace Split_payment.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Role { get; set; }
        public double? LivingArea { get; set; }
        public string IsApproved { get; set; }

        public int? ApartmentId { get; set; }
        public Apartment Apartment { get; set; }

        public List<Invoice> Invoices { get; set; }

    }
}
