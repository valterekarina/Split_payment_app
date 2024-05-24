using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;
using System;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class InvoicesOwnerCreateController : ControllerBase
    {
        private readonly IInvoiceRepository _invoiceRepository;

        public InvoicesOwnerCreateController(IInvoiceRepository invoiceRepository)
        {
            _invoiceRepository = invoiceRepository;
        }

        [HttpPost("create-invoice-owner")]
        public IActionResult CreateInvoice(Invoice model)
        {
            if (ModelState.IsValid)
            {
                var invoice = new Invoice
                {
                    InvoiceNo = model.InvoiceNo,
                    Rent = model.Rent,
                    Electricity = model.Electricity,
                    UtilityPayment = model.UtilityPayment,
                    Heating = model.Heating,
                    SumToPay = model.Rent + model.Electricity + model.UtilityPayment + model.Heating,
                    UserId = model.UserId,
                    ApartmentId = model.ApartmentId,
                    Status = "unpaid",
                    Date = DateTime.Now
                };

                _invoiceRepository.Create(invoice);
                return Ok(invoice);
            }
            else
            {
                return BadRequest("invalid modelstate");
            }
        }
    }
}
