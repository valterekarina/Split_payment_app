using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Split_payment.Data;
using Split_payment.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class InvoicesGetAllController : ControllerBase
    {
        private readonly AppDbContext _context;
        public InvoicesGetAllController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("get-all-invoices")]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        {
            if (_context.Apartments == null)
            {
                return null;
            }

            return await _context.Invoices
                .Select(x => new Invoice()
                {
                    Id = x.Id,
                    InvoiceNo = x.InvoiceNo,
                    Rent = x.Rent,
                    Electricity = x.Electricity,
                    UtilityPayment = x.UtilityPayment,
                    Heating = x.Heating,
                    SumToPay = x.SumToPay,
                    UserId = x.UserId,
                    ApartmentId = x.ApartmentId,
                    Status = x.Status,
                    Date = x.Date,
                })
                .ToListAsync();
        }
    }
}
