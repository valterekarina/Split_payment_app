using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class InvoicesUserMarkPaidController : ControllerBase
    {
        private readonly IInvoiceRepository _invoiceRepository;

        public InvoicesUserMarkPaidController(IInvoiceRepository invoiceRepository)
        {
            _invoiceRepository = invoiceRepository;
        }

        [HttpPut("mark-paid")]
        public IActionResult EditInvoice(Invoice model)
        {
            if (ModelState.IsValid)
            {
                var invoice = _invoiceRepository.GetByNo(model.InvoiceNo);
                if (invoice == null)
                {
                    return NotFound();
                }
                else
                {
                    invoice.Status = "pending";

                    _invoiceRepository.Update(invoice);
                    return Ok(invoice);
                }
            }
            else
            {
                return BadRequest("invalid modelstate");
            }
        }
    }
}
