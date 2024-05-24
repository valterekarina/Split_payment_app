using Split_payment.Models;

namespace Split_payment.Data
{
    public interface IUserRepository
    {
        User Create(User user);
        User Delete(User user);
        User GetByEmail(string email);
        User GetById(int id);
        User Update(User user);
    }
}