using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class NoteDeleteController : ControllerBase
    {
        private readonly INoteRepository _noteRepository;

        public NoteDeleteController(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        [HttpDelete("delete-note")]
        public IActionResult DeleteNote(Note model)
        {
            if (ModelState.IsValid)
            {
                var post = _noteRepository.GetById(model.Id);

                if (post == null)
                {
                    return NotFound("note not found");
                }

                _noteRepository.Delete(post);
                return Ok("post deleted");
            }
            else
            {
                return BadRequest("Invalid modelstate");
            }
        }
    }
}
