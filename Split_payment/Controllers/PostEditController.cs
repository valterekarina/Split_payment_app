using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class PostEditController : ControllerBase
    {
        private readonly IPostRepository _postRepository;

        public PostEditController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpPut("edit-post")]
        public IActionResult EditPost(Post model)
        {
            if (ModelState.IsValid)
            {
                var post = _postRepository.GetById(model.Id);
                if (post == null)
                {
                    return NotFound("post not found");
                }
                else
                {
                    post.Name = model.Name;
                    post.Description = model.Description;
                    post.ForAll = model.ForAll;

                    _postRepository.Update(post);
                    return Ok(post);
                }
            }
            else
            {
                return BadRequest("invalid modelstate");
            }
        }
    }
}
