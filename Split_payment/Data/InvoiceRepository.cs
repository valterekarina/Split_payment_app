using Split_payment.Models;
using System.Linq;

namespace Split_payment.Data
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly AppDbContext _context;

        public InvoiceRepository(AppDbContext context)
        {
            _context = context;
        }
        public Invoice Create(Invoice invoice)
        {
            _context.Invoices.Add(invoice);
            invoice.Id = _context.SaveChanges();
            return invoice;
        }

        public Invoice GetByNo(string invoiceNo)
        {
            return _context.Invoices.FirstOrDefault(u => u.InvoiceNo == invoiceNo);
        }

        public Invoice Update(Invoice invoice)
        {
            _context.Invoices.Update(invoice);
            _context.SaveChanges();
            return invoice;
        }

        public Invoice Delete(Invoice invoice)
        {
            _context.Invoices.Remove(invoice);
            _context.SaveChanges();
            return invoice;
        }
    }
}
