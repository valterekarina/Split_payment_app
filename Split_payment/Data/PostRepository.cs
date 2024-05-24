using Split_payment.Models;
using System.Linq;

namespace Split_payment.Data
{
    public class PostRepository : IPostRepository
    {
        private readonly AppDbContext _context;

        public PostRepository(AppDbContext context)
        {
            _context = context;
        }
        public Post Create(Post post)
        {
            _context.Posts.Add(post);
            post.Id = _context.SaveChanges();
            return post;
        }

        public Post GetById(int id)
        {
            return _context.Posts.FirstOrDefault(u => u.Id == id);
        }

        public Post Update(Post post)
        {
            _context.Posts.Update(post);
            _context.SaveChanges();
            return post;
        }

        public Post Delete(Post post)
        {
            _context.Posts.Remove(post);
            _context.SaveChanges();
            return post;
        }
    }
}
