using Split_payment.Models;

namespace Split_payment.Data
{
    public interface INoteRepository
    {
        Note Create(Note note);
        Note Delete(Note note);
        Note GetById(int id);
        Note Update(Note note);
    }
}