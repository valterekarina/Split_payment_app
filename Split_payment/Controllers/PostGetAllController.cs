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
    public class PostGetAllController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public PostGetAllController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("get-all-posts")]
        public async Task<ActionResult<IEnumerable<Post>>> GetAllPosts()
        {
            if (_dbContext.Posts == null)
            {
                return null;
            }

            return await _dbContext.Posts
                .Select(x => new Post()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    ForAll = x.ForAll,
                })
                .ToListAsync();
        }
    }
}
