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
    public class ApartmentGetAllController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public ApartmentGetAllController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("get-all-apartments")]
        public async Task<ActionResult<IEnumerable<Apartment>>> GetAllApartments()
        {
            if (_dbContext.Apartments == null)
            {
                return null;
            }

            return await _dbContext.Apartments
                .Select(x => new Apartment()
                {
                    Id = x.Id,
                    City = x.City,
                    Street = x.Street,
                    HouseNo = x.HouseNo,
                    ApartmentNo = x.ApartmentNo,
                    Area = x.Area,
                    RentPrice = x.RentPrice,
                    Relation = x.Relation,
                })
                .ToListAsync();
        }
    }
}
