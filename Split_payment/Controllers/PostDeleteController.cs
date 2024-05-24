using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class PostDeleteController : ControllerBase
    {
        private readonly IPostRepository _postRepository;

        public PostDeleteController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpDelete("delete-post")]
        public IActionResult DeletePost(Post model)
        {
            if (ModelState.IsValid)
            {
                var post = _postRepository.GetById(model.Id);

                if (post == null)
                {
                    return NotFound("user not found");
                }

                _postRepository.Delete(post);
                return Ok("post deleted");
            }
            else
            {
                return BadRequest("Invalid modelstate");
            }
        }
    }
}
