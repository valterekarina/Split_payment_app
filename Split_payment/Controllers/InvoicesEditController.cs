using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class InvoicesEditController : ControllerBase
    {
        private readonly IInvoiceRepository _invoiceRepository;

        public InvoicesEditController(IInvoiceRepository invoiceRepository)
        {
            _invoiceRepository = invoiceRepository;
        }

        [HttpPut("edit-invoice")]
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
                    invoice.Status = model.Status;
                    invoice.Electricity = model.Electricity;
                    invoice.UtilityPayment = model.UtilityPayment;
                    invoice.Heating = model.Heating;
                    invoice.SumToPay = model.Electricity + model.Heating + model.UtilityPayment + invoice.Rent;

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
