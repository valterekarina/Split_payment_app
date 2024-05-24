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
    public class UsersGetAllController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public UsersGetAllController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("get-all-users")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllApartments()
        {
            if (_dbContext.Users == null)
            {
                return null;
            }

            return await _dbContext.Users
                .Select(x => new User()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Email = x.Email,
                    Phone = x.Phone,
                    Role = x.Role,
                    LivingArea = x.LivingArea,
                    ApartmentId = x.ApartmentId,
                    IsApproved = x.IsApproved,

                })
                .ToListAsync();
        }
    }
}
