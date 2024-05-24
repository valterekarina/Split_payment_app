using Split_payment.Models;

namespace Split_payment.Data
{
    public interface IInvoiceRepository
    {
        Invoice Create(Invoice invoice);
        Invoice Delete(Invoice invoice);
        Invoice GetByNo(string invoiceNo);
        Invoice Update(Invoice invoice);
    }
}