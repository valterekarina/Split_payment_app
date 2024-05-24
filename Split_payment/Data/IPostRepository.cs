using Split_payment.Models;

namespace Split_payment.Data
{
    public interface IPostRepository
    {
        Post Create(Post post);
        Post Delete(Post post);
        Post GetById(int id);
        Post Update(Post post);
    }
}