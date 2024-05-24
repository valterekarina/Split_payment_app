using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class PostCreateController : ControllerBase
    {
        private readonly IPostRepository _postRepository;

        public PostCreateController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpPost("create-post")]
        public IActionResult CreatePost(Post model)
        {
            if (ModelState.IsValid)
            {
                var post = new Post
                {
                    Name = model.Name,
                    Description = model.Description,
                    ForAll = model.ForAll,
                };

                _postRepository.Create(post);
                return Ok(post);
            }
            else
            {
                return BadRequest("invalid modelstate");
            }
        }
    }
}
