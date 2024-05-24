using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class NoteEditController : ControllerBase
    {
        private readonly INoteRepository _noteRepository;

        public NoteEditController(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        [HttpPut("edit-note")]
        public ActionResult EditApartment(Note model)
        {
            if (ModelState.IsValid)
            {
                var note = _noteRepository.GetById(model.Id);
                if (note == null)
                {
                    return NotFound("note not found");
                }
                else
                {
                    note.Text = model.Text;
                    note.NoteDate = model.NoteDate;

                    _noteRepository.Update(note);
                    return Ok(note);
                }
            }
            else
            {
                return BadRequest("invalid modelstate");
            }
        }
    }
}
