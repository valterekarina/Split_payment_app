using System;

namespace Split_payment.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; }
        public double Rent { get; set; }
        public double Electricity { get; set; }
        public double UtilityPayment { get; set; }
        public double Heating { get; set; }
        public double SumToPay { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }

        public int? UserId { get; set; }
        public User User { get; set; }

        public int? ApartmentId { get; set; }
        public Apartment Apartment { get; set; }
    }
}
