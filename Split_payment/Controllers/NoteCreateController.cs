using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;
using System;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class NoteCreateController : ControllerBase
    {
        private readonly INoteRepository _noteRepository;

        public NoteCreateController(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        [HttpPost("create-note")]
        public IActionResult CreateNote(Note model)
        {
            if (ModelState.IsValid)
            {
                var note = new Note
                {
                    Text = model.Text,
                    NoteDate = DateTime.Now,
                    ApartmentId = model.ApartmentId,
                };

                _noteRepository.Create(note);
                return Ok(note);
            }
            else
            {
                return BadRequest("invalid modelstate");
            }
        }
    }
}
