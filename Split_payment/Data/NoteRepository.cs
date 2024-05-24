using Split_payment.Models;
using System.Linq;

namespace Split_payment.Data
{
    public class NoteRepository : INoteRepository
    {
        private readonly AppDbContext _context;

        public NoteRepository(AppDbContext context)
        {
            _context = context;
        }
        public Note Create(Note note)
        {
            _context.Notes.Add(note);
            note.Id = _context.SaveChanges();
            return note;
        }

        public Note GetById(int id)
        {
            return _context.Notes.FirstOrDefault(u => u.Id == id);
        }

        public Note Update(Note note)
        {
            _context.Notes.Update(note);
            _context.SaveChanges();
            return note;
        }

        public Note Delete(Note note)
        {
            _context.Notes.Remove(note);
            _context.SaveChanges();
            return note;
        }
    }
}
