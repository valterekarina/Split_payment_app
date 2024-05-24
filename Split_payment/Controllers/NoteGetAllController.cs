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
    public class NoteGetAllController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public NoteGetAllController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("get-all-notes")]
        public async Task<ActionResult<IEnumerable<Note>>> GetAllNotes()
        {
            if (_dbContext.Notes == null)
            {
                return null;
            }

            return await _dbContext.Notes
                .Select(x => new Note()
                {
                    Id = x.Id,
                    Text = x.Text,
                    NoteDate = x.NoteDate,
                    ApartmentId = x.ApartmentId
                })
                .ToListAsync();
        }
    }
}
